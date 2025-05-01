<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Orçamento - Vidraçaria</title>
  <link rel="stylesheet" href="../css/menu.css">
  <link rel="stylesheet" href="../css/orcamento.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js"></script>
</head>
<body>
  <div class="dashboard">
    <?php include 'menu_lateral.php'; ?>
    <main class="main-content">
    <div class="top-actions">
      <div class="left-actions">
        <button class="btn-voltar-inicio" onclick="window.location.href='menu.php'">
          <i class="fa-solid fa-arrow-left"></i> Início
        </button>
      </div>
      <div class="right-actions">
        <button class="btn-limpar" onclick="limparOrcamento()">
          <i class="fa-solid fa-rotate-left"></i> Limpar Orçamento
        </button>
        <button class="btn-pdf" onclick="gerarPDF()">
          <i class="fa-solid fa-file-pdf"></i> Gerar PDF
        </button>
      </div>
    </div>
    
      <div class="form-section">
        <h2>Montar Orçamento</h2>
        <div class="orcamento-container">
          <div class="orcamento-form">
            <label for="cliente">Cliente:</label>
            <select id="cliente"><option value="">Selecione um cliente</option></select>

            <label for="produto">Produto:</label>
            <select id="produto" onchange="carregarMateriaisDoProduto()"><option value="">Selecione um produto</option></select>

            <div id="campoLarguraSimples">
              <label for="larguraVidro">Largura (m):</label>
              <input type="number" id="larguraVidro" step="0.01">
            </div>

            <div id="campoLarguraDupla" style="display: none;">
              <label for="larguraBox1">Largura 1 (m):</label>
              <input type="number" id="larguraBox1" step="0.01">
              <label for="larguraBox2">Largura 2 (m):</label>
              <input type="number" id="larguraBox2" step="0.01">
            </div>

            <div id="campoAltura">
              <label for="alturaVidro">Altura (m):</label>
              <input type="number" id="alturaVidro" step="0.01">
            </div>

            <button onclick="calcularTotal()">Adicionar Produto ao Orçamento</button>

          </div>

          <div id="areaMateriais" class="orcamento-materiais hidden">
            <h3>Materiais do Produto</h3>
            <table id="tabelaMateriais">
              <thead>
                <tr><th>Nome</th><th>Peso (Kg/m)</th><th>Valor (R$)</th><th>Cálculo</th><th>Tipo</th></tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="orcamento-resumo-final">
        <h2>Resumo dos Produtos Adicionados</h2>
        <table id="tabelaResumoProdutos">
          <thead>
            <tr><th>Produto</th><th>Dimensões</th><th>Remover</th></tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>

      <div id="areaResultadosContainer"></div>

    
    </main>
  </div>
  <script src="../js/orcamento.js"></script>
</body>
</html>
