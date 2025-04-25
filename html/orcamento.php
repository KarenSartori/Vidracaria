<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Gerar Orçamento - Vidraçaria</title>
  <link rel="stylesheet" href="../css/menu.css">
  <link rel="stylesheet" href="../css/listar_materiais.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f5f5f5;
      margin: 0;
    }

    .form-section {
      background: white;
      padding: 20px;
      border-radius: 10px;
      max-width: 800px;
      margin: auto;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }

    input, select {
      padding: 10px;
      margin: 10px 0;
      width: 100%;
      border-radius: 5px;
      border: 1px solid #ccc;
    }

    table {
      width: 100%;
      margin-top: 20px;
      border-collapse: collapse;
    }

    th, td {
      padding: 10px;
      border: 1px solid #ddd;
      text-align: center;
    }

    #resultadoFinal {
      margin-top: 20px;
      font-size: 18px;
      font-weight: bold;
      color: green;
    }
  </style>
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
