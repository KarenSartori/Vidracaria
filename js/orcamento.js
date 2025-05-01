let orcamentoProdutos = [];

function limparOrcamento() {
  orcamentoProdutos = [];

  const cliente = document.getElementById('cliente');
  const produto = document.getElementById('produto');
  const larguraVidro = document.getElementById('larguraVidro');
  const larguraBox1 = document.getElementById('larguraBox1');
  const larguraBox2 = document.getElementById('larguraBox2');
  const alturaVidro = document.getElementById('alturaVidro');

  const campoLarguraSimples = document.getElementById('campoLarguraSimples');
  const campoLarguraDupla = document.getElementById('campoLarguraDupla');
  const campoAltura = document.getElementById('campoAltura');
  const areaMateriais = document.getElementById('areaMateriais');
  const areaResultados = document.getElementById('areaResultados');
  const resultadoFinal = document.getElementById('resultadoFinal');
  const tabelaMateriais = document.querySelector('#tabelaMateriais tbody');
  const tabelaResultados = document.querySelector('#tabelaResultados tbody');
  const tabelaResumo = document.querySelector('#tabelaResumoProdutos tbody');
  const areaResultadosContainer = document.getElementById('areaResultadosContainer');

  if (cliente) cliente.selectedIndex = 0;
  if (produto) produto.selectedIndex = 0;
  if (larguraVidro) larguraVidro.value = '';
  if (larguraBox1) larguraBox1.value = '';
  if (larguraBox2) larguraBox2.value = '';
  if (alturaVidro) alturaVidro.value = '';
  if (campoLarguraSimples) campoLarguraSimples.style.display = 'block';
  if (campoLarguraDupla) campoLarguraDupla.style.display = 'none';
  if (campoAltura) campoAltura.style.display = 'block';
  if (areaMateriais) areaMateriais.classList.add('hidden');
  if (areaResultados) areaResultados.classList.add('hidden');
  if (tabelaMateriais) tabelaMateriais.innerHTML = '';
  if (tabelaResultados) tabelaResultados.innerHTML = '';
  if (tabelaResumo) tabelaResumo.innerHTML = '';
  if (resultadoFinal) resultadoFinal.innerHTML = '';
  if (areaResultadosContainer) areaResultadosContainer.innerHTML = '';
}


async function carregarClientes() {
  try {
    const resp = await fetch('../php/cliente_orcamento.php');
    const clientes = await resp.json();
    console.log('Clientes carregados:', clientes); 

    const selectCliente = document.getElementById('cliente'); // ✅ ADICIONE ESTA LINHA AQUI

clientes.forEach(cliente => {
  const option = document.createElement('option');
  option.value = cliente.id;
  option.textContent = cliente.nome;
  option.dataset.email = cliente.email;
  option.dataset.telefone = cliente.telefone;
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
      <td>${parseFloat(mat.peso_kg_aluminio).toFixed(2)}</td>
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

  const linhasTotais = [];

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

      linhasTotais.push({
        label: `${mat.nome}`,
        valor: subtotal.toFixed(2),
        calculo: `${peso.toFixed(3)} kg/m × ${metro.toFixed(2)} m × R$${precoKg.toFixed(2)}`
      });
    });
  }

  vidros.forEach(mat => {
    const precoM2 = parseFloat(mat.peso_kg_aluminio);
    const area = largura * altura;
    const subtotal = area * precoM2;
    totalVidro += subtotal;

    linhasTotais.push({
      label: `${mat.nome}`,
      valor: subtotal.toFixed(2),
      calculo: `${area.toFixed(2)} m² × R$${precoM2.toFixed(2)}`
    });
  });

  kits.forEach(kit => {
    const precoKit = parseFloat(kit.peso_kg_aluminio);
    linhasTotais.push({
      label: `${kit.nome}`,
      valor: precoKit.toFixed(2),
      calculo: `Valor fixo`
    });
  });

  if (!produtoNome.includes("box") && totalAluminio > 0) {
    linhasTotais.push({ label: 'Total Alumínio', valor: totalAluminio, calculo: '' });
  }

  linhasTotais.push({ label: 'Total Vidro', valor: totalVidro, calculo: '' });

  fechaduras.forEach(mat => {
    const valor = parseFloat(mat.peso_kg_aluminio);
    linhasTotais.push({
      label: `Total com ${mat.nome}`,
      valor: totalAluminio + totalVidro + valor,
      calculo: ''
    });
  });

  kits.forEach(kit => {
    const precoKit = parseFloat(kit.peso_kg_aluminio);
    const vidrosBox = largura * 2 * 1.9 * (vidros[0] ? parseFloat(vidros[0].peso_kg_aluminio) : 0);
    linhasTotais.push({
      label: `Total com ${kit.nome}`,
      valor: totalAluminio + vidrosBox + precoKit,
      calculo: ''
    });
  });

  // Salvar produto completo no array
  orcamentoProdutos.push({
    nomeProduto: produtoNome,
    largura,
    altura,
    materiais: [...materiais],
    totais: linhasTotais
  });

  renderizarTabelaProduto(orcamentoProdutos.length - 1);
  atualizarTabelaResumo();
  limparInputsOrcamento();

}


document.addEventListener('DOMContentLoaded', () => {
  carregarProdutos();
  carregarClientes();
});


async function gerarPDF() {
  const jsPDF = window.jspdf.jsPDF;
  const doc = new jsPDF();

  const clienteSelect = document.getElementById('cliente');
  const clienteNome = clienteSelect.options[clienteSelect.selectedIndex]?.text || '---';

  const dataHora = new Date().toLocaleString('pt-BR');

  const logo = new Image();
  logo.src = '../imagens/image.png';

  logo.onload = () => {
    doc.addImage(logo, 'PNG', 10, 10, 40, 20);

    doc.setFont('helvetica');
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text('Data/Hora:', 150, 20);
    doc.setFont(undefined, 'normal');
    doc.text(dataHora, 150, 26);

    let y = 40;

    const clienteOption = clienteSelect.options[clienteSelect.selectedIndex];
    const clienteNome = clienteOption.text || '---';
    const clienteTelefone = clienteOption.dataset.telefone || '---';
    const clienteEmail = clienteOption.dataset.email || '---';

    y += 6;

    doc.autoTable({
      startY: y,
      theme: 'plain',
      margin: { left: 10, right: 10 },
      styles: {
        fontSize: 10,
        cellPadding: 2,
        halign: 'left',
        valign: 'middle'
      },
      body: [
        [
          { content: 'Cliente:', styles: { fontStyle: 'bold' } },
          clienteNome,
          { content: 'Telefone:', styles: { fontStyle: 'bold' } },
          clienteTelefone
        ],
        [
          // { content: 'Contato:', styles: { fontStyle: 'bold' } },
          // clienteNome.split(' ')[0],
          { content: 'E-mail:', styles: { fontStyle: 'bold' } },
          clienteEmail
        ]
      ],
      columnStyles: {
        0: { cellWidth: 20 },
        1: { cellWidth: 60 },
        2: { cellWidth: 20 },
        // 3: { cellWidth: 60 }
      },
      didDrawCell: function (data) {
        const rowIndex = data.row.index;
        const cell = data.cell;
        const table = data.table;
      
        if (data.column.index === 3 && (rowIndex === 0 || rowIndex === 1)) {
          const yLine = cell.y + cell.height;
          const xStart = table.settings.margin.left || 10;
          const xEnd = xStart + (table.width || 180);
      
          doc.setDrawColor(160);
          doc.setLineWidth(0.2);
          doc.line(xStart, yLine, xEnd, yLine);
        }  
      }
    });

    y += 40;

    orcamentoProdutos.forEach((item, index) => {
      doc.setFont(undefined, 'bold');
      doc.text(`Produto ${index + 1}: ${item.nomeProduto.toUpperCase()}`, 10, y);
      y += 6;
      doc.setFont(undefined, 'normal');
      doc.text(`Largura: ${item.largura} m`, 10, y);
      y += 6;
      doc.text(`Altura: ${item.altura} m`, 10, y);
      y += 8;

      const headers = [['Descrição', 'Valor (R$)']];
      const body = item.totais
        .filter(linha =>
          linha.label.toLowerCase().includes('total com') 
          // ||
          // linha.label.toLowerCase() === 'total vidro'
        )
        .map(linha => [
          linha.label,
          `R$ ${parseFloat(linha.valor).toFixed(2)}`
        ]);

      if (body.length > 0) {
        doc.autoTable({
          head: headers,
          body: body,
          startY: y,
          theme: 'grid',
          margin: { left: 10, right: 10 },
          headStyles: { fillColor: [26, 52, 57], textColor: 255 },
          bodyStyles: { fontSize: 10 }
        });

        y = doc.lastAutoTable.finalY + 20;
      } else {
        doc.text('Nenhum total encontrado.', 10, y);
        y += 10;
      }
    });

    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text('Vidraçaria Araras', 10, 280);
    doc.text('Email: vidrararas@hotmail.com | Telefone: (19) 3547-8430', 10, 286);
    doc.text('Endereço: Rua Arthur Nogueira, 265, Vila Europa, Araras-SP CEP: 13.604-020', 10, 292);

    doc.save('orcamento_vidracaria.pdf');
  };
}


// Função auxiliar para gerar sem imagem
function gerarPDFSemLogo(doc, clienteNome, dataHora) {
  let y = 20;

  doc.setFont('helvetica');
  doc.setFontSize(10);
  doc.text('Data/Hora:', 150, y);
  doc.text(dataHora, 150, y + 6);

  y += 20;
  doc.setFontSize(12);
  doc.text('Cliente:', 10, y);
  doc.text(clienteNome, 30, y);
  y += 10;

  orcamentoProdutos.forEach((item, index) => {
    doc.setFont(undefined, 'bold');
    doc.text(`Produto ${index + 1}: ${item.nomeProduto.toUpperCase()}`, 10, y);
    y += 6;
    doc.setFont(undefined, 'normal');
    doc.text(`Largura: ${item.largura} m`, 10, y);
    y += 6;
    doc.text(`Altura: ${item.altura} m`, 10, y);
    y += 8;

    const headers = [['Descrição', 'Valor (R$)']];
    const body = item.totais
      .filter(linha =>
        linha.label.toLowerCase().includes('total com') ||
        linha.label.toLowerCase() === 'total vidro'
      )
      .map(linha => [
        linha.label,
        `R$ ${parseFloat(linha.valor).toFixed(2)}`
      ]);


    doc.autoTable({
      head: headers,
      body: body,
      startY: y,
      theme: 'grid',
      margin: { left: 10, right: 10 },
      headStyles: { fillColor: [26, 52, 57], textColor: 255 },
      bodyStyles: { fontSize: 10 }
    });

    y = doc.lastAutoTable.finalY + 10;
  });

  doc.save('orcamento_vidracaria.pdf');
}


function removerProduto(index) {
  orcamentoProdutos.splice(index, 1);

  // Remove a tabela visual do produto removido
  const container = document.getElementById('areaResultadosContainer');
  container.removeChild(container.children[index]);

  // Atualiza o resumo
  atualizarTabelaResumo();
}

function renderizarTabelaProduto(index) {
  const produto = orcamentoProdutos[index];
  const container = document.getElementById('areaResultadosContainer');

  const novaTabela = document.createElement('div');
  novaTabela.classList.add('orcamento-tabela-produto');

  const titulo = document.createElement('h3');
  titulo.textContent = `Produto: ${produto.nomeProduto.toUpperCase()} - ${produto.largura}m x ${produto.altura}m`;

  const tabela = document.createElement('table');
  tabela.innerHTML = `
    <thead>
      <tr>
        <th>Nome</th>
        <th>Cálculo</th>
        <th>Valor (R$)</th>
      </tr>
    </thead>
    <tbody>
      ${produto.totais.map(item => `
        <tr>
          <td>${item.label}</td>
          <td>${item.calculo || '-'}</td>
          <td><strong>R$ ${parseFloat(item.valor).toFixed(2)}</strong></td>
        </tr>
      `).join('')}
    </tbody>
  `;

  novaTabela.appendChild(titulo);
  novaTabela.appendChild(tabela);
  container.appendChild(novaTabela);
}


function atualizarTabelaResumo() {
  const tbody = document.querySelector('#tabelaResumoProdutos tbody');
  tbody.innerHTML = '';

  orcamentoProdutos.forEach((p, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${p.nomeProduto.toUpperCase()}</td>
      <td>${p.largura}m x ${p.altura}m</td>
      <td><button onclick="removerProduto(${i})" style="color: red; cursor: pointer;">
        <i class="fa-solid fa-trash"></i>
      </button></td>
    `;
    tbody.appendChild(tr);
  });
}

function limparInputsOrcamento() {
  const produtoSelect = document.getElementById('produto');
  const larguraVidro = document.getElementById('larguraVidro');
  const larguraBox1 = document.getElementById('larguraBox1');
  const larguraBox2 = document.getElementById('larguraBox2');
  const alturaVidro = document.getElementById('alturaVidro');
  const areaMateriais = document.getElementById('areaMateriais');
  const tabelaMateriais = document.querySelector('#tabelaMateriais tbody');
  const tabelaResultados = document.querySelector('#tabelaResultados tbody');
  const resultadoFinal = document.getElementById('resultadoFinal');
  const campoLarguraSimples = document.getElementById('campoLarguraSimples');
  const campoLarguraDupla = document.getElementById('campoLarguraDupla');
  const campoAltura = document.getElementById('campoAltura');

  // Limpa campos de input
  if (larguraVidro) larguraVidro.value = '';
  if (larguraBox1) larguraBox1.value = '';
  if (larguraBox2) larguraBox2.value = '';
  if (alturaVidro) alturaVidro.value = '';

  // Mantém o produto selecionado antes de resetar (opcional)
  if (produtoSelect) produtoSelect.selectedIndex = 0;

  // Reseta exibições e tabelas
  if (areaMateriais) areaMateriais.classList.add('hidden');
  if (tabelaMateriais) tabelaMateriais.innerHTML = '';
  if (tabelaResultados) tabelaResultados.innerHTML = '';
  if (resultadoFinal) resultadoFinal.innerHTML = '';

  // ⚠️ Define sempre os campos como padrão
  if (campoLarguraSimples) campoLarguraSimples.style.display = 'block';
  if (campoLarguraDupla) campoLarguraDupla.style.display = 'none';
  if (campoAltura) campoAltura.style.display = 'block';
}
