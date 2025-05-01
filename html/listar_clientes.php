<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Lista de Clientes - Vidraçaria</title>
  <link rel="stylesheet" href="../css/menu.css">
  <link rel="stylesheet" href="../css/listar_clientes.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
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
      <h2>Clientes Cadastrados</h2>
      <p id="total-clientes" style="text-align: center; font-size: 15px; color: #555; margin-top: -15px; margin-bottom: 20px;"></p>
      <div class="filtros-clientes">
        <input type="text" id="filtro" placeholder="Buscar por nome, telefone ou email." />
      </div>
      <table class="styled-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>CEP</th>
            <th>Rua</th>
            <th>Número</th>
            <th>Cidade</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody id="lista-clientes">
          <!-- Clientes serão inseridos aqui via JS -->
        </tbody>
      </table>
      <div id="paginacao" class="paginacao"></div>
    </main>
  </div>

  <!-- RODAPÉ -->
  <!-- <footer class="footer">
    <p>© 2025 Vidraçaria | Todos os direitos reservados</p>
  </footer> -->

  <script src="../js/listar_clientes.js"></script>
</body>
</html>
