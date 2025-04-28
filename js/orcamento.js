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
  const tbodyResultados = document.getElementById('tabelaResultados').querySelector('tbody');
  tbodyResultados.innerHTML = ""; // Limpa a tabela de resultados

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

    // Linha do material no resumo final
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${mat.nome}</td>
      <td>${peso.toFixed(3)} kg/m × ${metro.toFixed(2)} m × R$${precoKg.toFixed(2)}</td>
      <td><strong>R$ ${subtotal.toFixed(2)}</strong></td>
    `;
    tbodyResultados.appendChild(tr);
  });

  const totalVidro = largura * altura * precoVidro;
  const totalComFechadura240 = totalVidro + totalAluminio + 240;
  const totalComFechadura100 = totalVidro + totalAluminio + 100;

  // Linhas de totais no resumo
  const linhasTotais = [
    { label: 'Total Alumínio', valor: totalAluminio },
    { label: 'Total Vidro', valor: totalVidro },
    { label: 'Total com Fechadura contra parede (R$240)', valor: totalComFechadura240 },
    { label: 'Total com Bate Fecha (R$100)', valor: totalComFechadura100 },
  ];

  linhasTotais.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td colspan="2"><strong>${item.label}</strong></td>
      <td><strong>R$ ${item.valor.toFixed(2)}</strong></td>
    `;
    tbodyResultados.appendChild(tr);
  });

  // Mostra o resumo final
  document.getElementById('areaResultados').classList.remove('hidden');

  // Esconde o texto separado de resultado
  document.getElementById("resultadoFinal").innerHTML = "";
}

// Inicialização
carregarProdutos();
carregarClientes();

async function gerarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const clienteSelect = document.getElementById('cliente');
  const clienteNome = clienteSelect.options[clienteSelect.selectedIndex]?.text || '---';

  const produtoSelect = document.getElementById('produto');
  const produtoNome = produtoSelect.options[produtoSelect.selectedIndex]?.text || '---';

  const largura = document.getElementById('larguraVidro').value || '---';
  const altura = document.getElementById('alturaVidro').value || '---';

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

    let y = 50;

    // Dados do cliente/produto
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Cliente:', 10, y);
    doc.setFont(undefined, 'normal');
    doc.text(clienteNome, 40, y);

    y += 10;
    doc.setFont(undefined, 'bold');
    doc.text('Produto:', 10, y);
    doc.setFont(undefined, 'normal');
    doc.text(produtoNome, 40, y);

    y += 10;
    doc.setFont(undefined, 'bold');
    doc.text('Largura:', 10, y);
    doc.setFont(undefined, 'normal');
    doc.text(`${largura} m`, 40, y);

    y += 8;
    doc.setFont(undefined, 'bold');
    doc.text('Altura:', 10, y);
    doc.setFont(undefined, 'normal');
    doc.text(`${altura} m`, 40, y);

    y += 15;

    // --- Montando a tabela a partir de #tabelaResultados ---

    const headers = [['Nome', 'Cálculo', 'Valor (R$)']];
    const body = [];

    const linhasTabela = document.querySelectorAll('#tabelaResultados tbody tr');

    linhasTabela.forEach((linha, index) => {
      const cols = linha.querySelectorAll('td');
      const row = [];
      cols.forEach(col => row.push(col.innerText.trim()));
      body.push(row);
    });

    doc.autoTable({
      head: headers,
      body: body,
      startY: y,
      theme: 'grid',
      headStyles: { fillColor: [26, 52, 57], textColor: 255 },
      bodyStyles: { fontSize: 10 },
      didParseCell: function (data) {
        const rowIndex = data.row.index;
        const totalRows = linhasTabela.length;

        if (rowIndex === totalRows - 1) {
          data.cell.styles.fillColor = [255, 243, 205]; 
          data.cell.styles.fontStyle = 'bold';
        }
        if (rowIndex === totalRows - 2) { 
          data.cell.styles.fillColor = [230, 242, 255]; 
          data.cell.styles.fontStyle = 'bold';
        }
        if (rowIndex >= totalRows - 4) { 
          data.cell.styles.fontStyle = 'bold';
        }
      }
    });

    doc.save('orcamento_vidracaria.pdf');
  };
}
