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
      <td>${mat.tipo}</td>
    `;
    tbody.appendChild(tr);
  });

  document.getElementById('areaMateriais').classList.remove('hidden');
  const produtoSelect = document.getElementById('produto');
  const produtoNome = produtoSelect.options[produtoSelect.selectedIndex]?.text.toLowerCase() || '';

  const campoSimples = document.getElementById('campoLarguraSimples');
  const campoDuplo = document.getElementById('campoLarguraDupla');
  const campoAltura = document.getElementById('campoAltura');
  const alturaInput = document.getElementById('alturaVidro');

  if (produtoNome.includes("box")) {
    campoSimples.style.display = "none";
    campoDuplo.style.display = "block";
    campoAltura.style.display = "none";
    alturaInput.value = 1.9; 
  } else {
    campoSimples.style.display = "block";
    campoDuplo.style.display = "none";
    campoAltura.style.display = "block";
    alturaInput.value = ""; 
  }

}

function calcularTotal() {
  const produtoSelect = document.getElementById('produto');
  const produtoNome = produtoSelect.options[produtoSelect.selectedIndex]?.text.toLowerCase() || '';

  let largura, altura;

  if (produtoNome.includes("box")) {
    const largura1 = parseFloat(document.getElementById("larguraBox1").value);
    const largura2 = parseFloat(document.getElementById("larguraBox2").value);

    if (isNaN(largura1) || isNaN(largura2)) {
      alert("Preencha as duas larguras corretamente!");
      return;
    }

    largura = largura1 + largura2;
    altura = 1.9;
  } else {
    largura = parseFloat(document.getElementById("larguraVidro").value);
    altura = parseFloat(document.getElementById("alturaVidro").value);

    if (isNaN(largura) || isNaN(altura)) {
      alert("Preencha a largura e altura corretamente!");
      return;
    }
  }

  const aluminio = materiais.filter(m => m.tipo === 'aluminio');
  const vidros = materiais.filter(m => m.tipo === 'vidro');
  const fechaduras = materiais.filter(m => m.tipo === 'fechadura');
  const kits = materiais.filter(m => m.tipo === 'kit');

  let totalAluminio = 0;
  let totalVidro = 0;

  const tbodyResultados = document.getElementById('tabelaResultados').querySelector('tbody');
  tbodyResultados.innerHTML = "";

  if (!produtoNome.includes("box")) {
  aluminio.forEach(mat => {
    let metro = 0;
    if (mat.tipo_calculo === "largura*2") metro = largura * 2;
    else if (mat.tipo_calculo === "altura*2") metro = altura * 2;
    else if (mat.tipo_calculo === "largura") metro = largura;
    else if (mat.tipo_calculo === "altura") metro = altura;

    const peso = parseFloat(mat.peso_kg_m);
    const precoKg = parseFloat(mat.peso_kg_aluminio);
    const subtotal = metro * peso * precoKg;
    totalAluminio += subtotal;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${mat.nome}</td>
      <td>${peso.toFixed(3)} kg/m × ${metro.toFixed(2)} m × R$${precoKg.toFixed(2)}</td>
      <td><strong>R$ ${subtotal.toFixed(2)}</strong></td>
    `;
    tbodyResultados.appendChild(tr);
  });
  }

  vidros.forEach(mat => {
    const precoM2 = parseFloat(mat.peso_kg_aluminio);
    const area = largura * altura;
    const subtotal = area * precoM2;
    totalVidro += subtotal;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${mat.nome}</td>
      <td>${area.toFixed(2)} m² × R$${precoM2.toFixed(2)}</td>
      <td><strong>R$ ${subtotal.toFixed(2)}</strong></td>
    `;
    tbodyResultados.appendChild(tr);
  });


  const totaisFechaduras = fechaduras.map(mat => {
    const valor = parseFloat(mat.peso_kg_aluminio);
    return {
      nome: mat.nome,
      total: totalAluminio + totalVidro + valor
    };
  });

  const vidrosBox = vidros.map(mat => {
    const precoM2 = parseFloat(mat.peso_kg_aluminio);
    const areaBox = largura * 2 * 1.9;
    const subtotal = areaBox * precoM2;
    return {
      nome: mat.nome,
      subtotal
    };
  });

  const totaisKits = [];
  kits.forEach(kit => {
    const precoKit = parseFloat(kit.peso_kg_aluminio);
  
    const trKit = document.createElement('tr');
    trKit.innerHTML = `
      <td>${kit.nome}</td>
      <td>Valor fixo</td>
      <td><strong>R$ ${precoKit.toFixed(2)}</strong></td>
    `;
    tbodyResultados.appendChild(trKit);
  
    if (produtoNome.includes("box")) {
      vidrosBox.forEach(vidroBox => {
        totaisKits.push({
          label: `Total com ${kit.nome} (Box c/ ${vidroBox.nome})`,
          valor: totalAluminio + vidroBox.subtotal + precoKit
        });
      });
    } else {
      totaisKits.push({
        label: `Total com ${kit.nome}`,
        valor: totalAluminio + totalVidro + precoKit
      });
    }
  });
  
  const linhasTotais = [];

  if (!produtoNome.includes("box") && totalAluminio > 0) {
    linhasTotais.push({ label: 'Total Alumínio', valor: totalAluminio });
  }  

  linhasTotais.push({ label: 'Total Vidro', valor: totalVidro });

  linhasTotais.push(
    ...totaisFechaduras.map(f => ({
      label: `Total com ${f.nome}`,
      valor: f.total
    }))
  );

  linhasTotais.push(...totaisKits);

  linhasTotais.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td colspan="2"><strong>${item.label}</strong></td>
      <td><strong>R$ ${item.valor.toFixed(2)}</strong></td>
    `;
    tbodyResultados.appendChild(tr);
  });

  document.getElementById('areaResultados').classList.remove('hidden');
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

  const produtoSelect = document.getElementById('produto'); // <- corrigido aqui
  const produtoNome = produtoSelect.options[produtoSelect.selectedIndex]?.text.toLowerCase() || '';

  let largura, altura;
  if (produtoNome.includes("box")) {
    const largura1 = document.getElementById("larguraBox1").value || '---';
    const largura2 = document.getElementById("larguraBox2").value || '---';
    largura = `${largura1} + ${largura2}`;
    altura = "1.9";
  } else {
    largura = document.getElementById("larguraVidro").value || '---';
    altura = document.getElementById("alturaVidro").value || '---';
  }

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
    doc.text(produtoNome.toUpperCase(), 40, y);

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

    const headers = [['Nome', 'Cálculo', 'Valor (R$)']];
    const body = [];

    const linhasTabela = document.querySelectorAll('#tabelaResultados tbody tr');
    linhasTabela.forEach(linha => {
      const cols = linha.querySelectorAll('td');
      const row = [];
      cols.forEach(col => {
        row.push(col.innerText.trim());
      });
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
        const rowText = data.row.raw?.[0]?.toLowerCase() || "";
        const isKitLine = rowText.includes("total com kit");
        const isBox = produtoNome.includes("box");
      
        if (isKitLine && isBox) {
          data.cell.styles.fillColor = [220, 235, 255]; 
          data.cell.styles.fontStyle = 'bold';
          return; 
        }

        const rowIndex = data.row.index;
        const totalRows = body.length;
      
        if (rowIndex === totalRows - 1) {
          data.cell.styles.fillColor = [255, 243, 205]; 
          data.cell.styles.fontStyle = 'bold';
        } else if (rowIndex === totalRows - 2) {
          data.cell.styles.fillColor = [230, 242, 255]; 
          data.cell.styles.fontStyle = 'bold';
        } else if (rowIndex >= totalRows - 4) {
          data.cell.styles.fontStyle = 'bold';
        }
      }      
    });

    doc.save('orcamento_vidracaria.pdf');
  };
}

