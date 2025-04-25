<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Dashboard - Vidraçaria</title>
  <link rel="stylesheet" href="../css/menu.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
</head>
<body>
  <div class="dashboard">
  <?php include 'menu_lateral.php'; ?>
    <!-- CONTEÚDO PRINCIPAL -->
    <main class="main-content">
      <header class="main-header">
        <div class="user-info">
          <i class="fa-solid fa-user-circle"></i>
          <span>Bem-vindo, usuario?!</span>
        </div>
      </header>

      <section class="cards">
        <div class="card" onclick="location.href='cadastro_cliente.php'">
          <i class="fa-solid fa-user-plus"></i>
          <h3>Cadastro de Cliente</h3>
        </div>
        <div class="card" onclick="location.href='listar_clientes.php'">
        <i class="fa-solid fa-users"></i>
          <h3>Listagem de Cliente</h3>
        </div>
        <!-- <div class="card" onclick="location.href='cadastro_funcionario.php'">
          <i class="fa-solid fa-users"></i>
          <h3>Cadastro de Funcionário</h3>
        </div> -->
        <div class="card" onclick="location.href='listar_produtos.php'">
          <i class="fa-solid fa-screwdriver-wrench"></i>
          <h3>Editar Produtos</h3>
        </div>
        <div class="card" onclick="location.href='listar_materiais.php'">
          <i class="fa-solid fa-screwdriver-wrench"></i>
          <h3>Editar Materiais</h3>
        </div>
        <div class="card" onclick="location.href='orcamento.php'">
          <i class="fa-solid fa-file-invoice-dollar"></i>
          <h3>Gerar Orçamento</h3>
        </div>
      </section>
    </main>
  </div>

  <!-- RODAPÉ -->
  <footer class="footer">
    <p>© 2025 Vidraçaria | Todos os direitos reservados</p>
  </footer> 

  <script src="../js/menu.js"></script>
</body>
</html>
