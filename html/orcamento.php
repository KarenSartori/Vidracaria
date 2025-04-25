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
      </div>

      <header class="main-header">
        <div class="user-info">
          <i class="fa-solid fa-user-circle"></i>
          <span>Bem-vindo, usuário!</span>
        </div>
      </header>

      <h2>Gerar Orçamento</h2>

      <div class="form-section">
  <h2>Orçamento</h2>
  <button class="btn-pdf" type="button" onclick="gerarPDF()">
  <i class="fa-solid fa-file-pdf"></i> Gerar PDF
</button>

  <div class="orcamento-container">
    <!-- Coluna da esquerda: Inputs -->
    <div class="orcamento-form">
      <label for="produto">Produto:</label>
      <select id="produto" onchange="carregarMateriaisDoProduto()">
        <option value="">Selecione um produto</option>
      </select>

      <label for="larguraVidro">Largura do vidro (m):</label>
      <input type="number" id="larguraVidro" step="0.01">

      <label for="alturaVidro">Altura do vidro (m):</label>
      <input type="number" id="alturaVidro" step="0.01">

      <label for="precoVidro">Preço por m² do vidro: tem q pegar automatico isso</label>
      <input type="number" id="precoVidro" step="0.01" placeholder="Informe o preço manualmente">

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
            <th>Peso kg/m</th>
            <th>Valor kg Alumínio</th>
            <th>Tipo de Cálculo</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  </div>
</div>

    <p id="resultadoFinal"></p>
  </div>
    </main>
  </div>

  <footer class="footer">
    <p>© 2025 Vidraçaria | Todos os direitos reservados</p>
  </footer>

  <script src="../js/orcamento.js"></script>
</body>
</html>
