<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Gerar Orçamento - Vidraçaria</title>
  <link rel="stylesheet" href="../css/menu.css">
  <link rel="stylesheet" href="../css/listar_materiais.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link rel="stylesheet" href="../css/orcamento.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js"></script>
</head>
<body>
  <div class="dashboard">
    <?php include 'menu_lateral.php'; ?>

    <main class="main-content">
      <div class="top-actions">
        <button class="btn-voltar-inicio" onclick="window.location.href='menu.php'">
          <i class="fa-solid fa-arrow-left"></i> Início
        </button>

        <button class="logout-button" onclick="window.location.href='login.html'">
          <i class="fa-solid fa-right-from-bracket"></i> Sair
        </button>
      </div>

      <!-- <h2>Gerar Orçamento</h2> -->

      <div class="form-section">
        <h2>Orçamento</h2>
        <button class="btn-pdf" type="button" onclick="gerarPDF()">
          <i class="fa-solid fa-file-pdf"></i> Gerar PDF
        </button>
        <button class="btn-limpar" type="button" onclick="limparOrcamento()">
          <i class="fa-solid fa-rotate-left"></i> Limpar Orçamento
        </button>


        <div class="orcamento-container">
          <!-- Coluna da esquerda: Inputs -->
          <div class="orcamento-form">

            <label for="cliente">Cliente:</label>
            <select id="cliente">
              <option value="">Selecione um cliente</option>
            </select>

            <label for="produto">Produto:</label>
            <select id="produto" onchange="carregarMateriaisDoProduto()">
              <option value="">Selecione um produto</option>
            </select>

            <!-- Largura simples (para produtos normais) -->
            <div id="campoLarguraSimples">
              <label for="larguraVidro">Largura do vidro (m):</label>
              <input type="number" id="larguraVidro" step="0.01">
            </div>

            <!-- Largura dupla (para BOX) -->
            <div id="campoLarguraDupla" style="display: none;">
              <label for="larguraBox1">Largura 1 (m):</label>
              <input type="number" id="larguraBox1" step="0.01">

              <label for="larguraBox2">Largura 2 (m):</label>
              <input type="number" id="larguraBox2" step="0.01">
            </div>

            <!-- Altura (oculto ao selecionar BOX) -->
            <div id="campoAltura">
              <label for="alturaVidro">Altura do vidro (m):</label>
              <input type="number" id="alturaVidro" step="0.01">
            </div>


            <button onclick="calcularTotal()">Calcular Orçamento</button>

            <p id="resultadoFinal"></p>
          </div>

          <!-- Coluna da direita: Tabela -->
          <div id="areaMateriais" class="orcamento-materiais hidden">
            <h3>Materiais</h3>
            <table id="tabelaMateriais">
            <thead>
            <tr>
              <th>Nome</th>
              <th>Peso (Kg/m)</th>
              <th>Valor (R$)</th>
              <th>Cálculo</th>
              <th>Tipo</th>
            </tr>
          </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- NOVA TABELA DE RESULTADOS DEPOIS DO ORÇAMENTO -->
      <div id="areaResultados" class="orcamento-resultados hidden">
        <h2>Resumo do Orçamento</h2>
        <table id="tabelaResultados">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Cálculo</th>
              <th>Valor (R$)</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>

      <p id="resultadoFinal"></p>
    </main>
  </div>

  <!-- <footer class="footer">
    <p>© 2025 Vidraçaria | Todos os direitos reservados</p>
  </footer> -->

  <script src="../js/orcamento.js"></script>

</body>
</html>
