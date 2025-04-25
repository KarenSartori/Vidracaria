async function carregarClientes() {
  try {
    const resp = await fetch('../php/cliente_orcamento.php');
    const clientes = await resp.json();
    console.log('Clientes carregados:', clientes); 

    const selectCliente = document.getElementById('cliente');
    clientes.forEach(cliente => {
      const option = document.createElement('option');
      option.value = cliente.id;
      option.textContent = cliente.nome;
      selectCliente.appendChild(option);
    });
  } catch (error) {
    console.error('Erro ao carregar clientes:', error);
  }
}


async function carregarProdutos() {
  const resp = await fetch('../php/listar_produtos.php');
  const produtos = await resp.json();
  const select = document.getElementById('produto');

  produtos.forEach(produto => {
    const option = document.createElement('option');
    option.value = produto.id;
    option.textContent = produto.nome;
    select.appendChild(option);
  });
}

let materiais = [];

async function carregarMateriaisDoProduto() {
  const produtoId = document.getElementById('produto').value;
  if (!produtoId) return;

  const resp = await fetch(`../php/listar_materiais_produto.php?id=${produtoId}`);
  materiais = await resp.json();

  if (materiais.erro) {
    alert("Erro: " + materiais.erro);
    return;
  }

  const tbody = document.getElementById('tabelaMateriais').querySelector('tbody');
  tbody.innerHTML = "";

  materiais.forEach(mat => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${mat.nome}</td>
      <td>${mat.peso_kg_m}</td>
      <td>${mat.peso_kg_aluminio}</td>
      <td>${mat.tipo_calculo}</td>
    `;
    tbody.appendChild(tr);
  });

  document.getElementById('areaMateriais').classList.remove('hidden');
}

function calcularTotal() {
  const largura = parseFloat(document.getElementById("larguraVidro").value);
  const altura = parseFloat(document.getElementById("alturaVidro").value);
  const precoVidro = parseFloat(document.getElementById("precoVidro").value);

  if (isNaN(largura) || isNaN(altura) || isNaN(precoVidro)) {
    alert("Preencha todos os campos corretamente!");
    return;
  }

  let totalAluminio = 0;
  let log = [];

  materiais.forEach(mat => {
    let metro = 0;
    if (mat.tipo_calculo === "largura*2") metro = largura * 2;
    else if (mat.tipo_calculo === "altura*2") metro = altura * 2;
    else if (mat.tipo_calculo === "largura") metro = largura;
    else if (mat.tipo_calculo === "altura") metro = altura;
    else metro = 0;

    const peso = parseFloat(mat.peso_kg_m);
    const precoKg = parseFloat(mat.peso_kg_aluminio);
    const subtotal = metro * peso * precoKg;
    totalAluminio += subtotal;
    log.push(`${mat.nome}: ${peso.toFixed(3)}kg/m * ${metro.toFixed(2)}m * R$${precoKg} = R$${subtotal.toFixed(2)}`);
  });

  const totalVidro = largura * altura * precoVidro;
  totalComFechadura240 = totalVidro + totalAluminio + 240;
  totalComFechadura100 = totalVidro + totalAluminio + 100;

  const detalhes = `
    <strong>Detalhamento dos cálculos:</strong><br>
    <ul>${log.map(l => `<li>${l}</li>`).join("")}</ul>
    <p>Vidro (R$${precoVidro}/m²): ${largura}m x ${altura}m = <strong>R$${totalVidro.toFixed(2)}</strong></p>
    <p>Alumínio: <strong>R$${totalAluminio.toFixed(2)}</strong></p>
    <hr>
    <h3>Total com Fechadura contra parede (R$240): R$${totalComFechadura240.toFixed(2)}</h3>
    <h3>Total com Bate Fecha (R$100): R$${totalComFechadura100.toFixed(2)}</h3>
  `;

  document.getElementById("resultadoFinal").innerHTML = detalhes;
}

// Inicialização
carregarProdutos();
carregarClientes();

async function gerarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const clienteSelect = document.getElementById('cliente');
  const clienteNome = clienteSelect.options[clienteSelect.selectedIndex]?.text || '---';

  const produto = document.getElementById('produto').options[document.getElementById('produto').selectedIndex]?.text || '---';
  const largura = document.getElementById('larguraVidro').value || '---';
  const altura = document.getElementById('alturaVidro').value || '---';

  const valorFechadura1 = totalComFechadura240.toFixed(2);
  const valorFechadura2 = totalComFechadura100.toFixed(2);

  const dataHora = new Date().toLocaleString('pt-BR');

  const logo = new Image();
  logo.src = '../imagens/image.png';

  logo.onload = () => {
    doc.addImage(logo, 'PNG', 10, 10, 40, 20);

    doc.setFont('helvetica');
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text('Data/Hora:', 150, 20);
    doc.setFont(undefined, 'normal');
    doc.text(dataHora, 150, 26);

    let y = 60;

    // --- DADOS DO CLIENTE ---
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Cliente:', 10, y);
    doc.setFont(undefined, 'normal');
    doc.text(clienteNome, 35, y);
    y += 10;

    // --- PRODUTO ---
    doc.setFont(undefined, 'bold');
    doc.text('Produto:', 10, y);
    doc.setFont(undefined, 'normal');
    doc.text(produto, 35, y);
    y += 10;

    // --- LARGURA ---
    doc.setFont(undefined, 'bold');
    doc.text('Largura:', 10, y);
    doc.setFont(undefined, 'normal');
    doc.text(`${largura} m`, 35, y);
    y += 8;

    // --- ALTURA ---
    doc.setFont(undefined, 'bold');
    doc.text('Altura:', 10, y);
    doc.setFont(undefined, 'normal');
    doc.text(`${altura} m`, 35, y);
    y += 10;

    // --- VALORES ---
    doc.setFont(undefined, 'bold');
    doc.text('Total com Fechadura contra parede (R$240):', 10, y);
    doc.setFont(undefined, 'normal');
    doc.text(`R$ ${valorFechadura1}`, 130, y);
    y += 10;

    doc.setFont(undefined, 'bold');
    doc.text('Total com Bate Fecha (R$100):', 10, y);
    doc.setFont(undefined, 'normal');
    doc.text(`R$ ${valorFechadura2}`, 90, y);

    doc.save('orcamento_vidracaria.pdf');
  };
}
