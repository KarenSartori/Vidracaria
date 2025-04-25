<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Gerar Orçamento - Vidraçaria</title>
  <link rel="stylesheet" href="../css/menu.css">
  <link rel="stylesheet" href="../css/listar_materiais.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link rel="stylesheet" href="../css/orcamento.css">
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
    <label for="produto">Produto:</label>
    <select id="produto" onchange="carregarMateriaisDoProduto()">
      <option value="">Selecione um produto</option>
    </select>

    <label for="larguraVidro">Largura do vidro (m):</label>
    <input type="number" id="larguraVidro" step="0.01">

    <label for="alturaVidro">Altura do vidro (m):</label>
    <input type="number" id="alturaVidro" step="0.01">

    <label for="precoVidro">Preço por m² do vidro:</label>
<input type="number" id="precoVidro" step="0.01" placeholder="Informe o preço manualmente">


    <!-- <label for="tipoFechadura">Tipo de Fechadura:</label>
    <select id="tipoFechadura">
      <option value="fechadura">Fechadura contra parede (R$240,00)</option>
      <option value="bateFecha">Bate Fecha (R$100,00)</option>
    </select> -->

    <button onclick="calcularTotal()">Calcular Orçamento</button>

    <div id="areaMateriais" class="hidden">
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
