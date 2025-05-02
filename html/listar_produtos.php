<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Produtos - Vidraçaria</title>
  <link rel="stylesheet" href="../css/menu.css">
  <link rel="stylesheet" href="../css/listar_produtos.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
</head>
<body>
  <div class="dashboard">
  <?php include 'menu_lateral.php'; ?>

    <!-- CONTEÚDO PRINCIPAL -->
    <main class="main-content">
      <div class="top-actions">
        <button class="btn-voltar-inicio" onclick="window.location.href='menu.php'">
          <i class="fa-solid fa-arrow-left"></i> Início
        </button>

        <button class="logout-button" onclick="window.location.href='login.html'">
          <i class="fa-solid fa-right-from-bracket"></i> Sair
        </button>
      </div>
      <div class="header">
        <h2>Lista de Produtos</h2>
      </div>
      <section class="produtos-container">
      </section>
    </main>
  </div>

  <!-- MODAL -->
  <div class="modal" id="modalDetalhes">
    <div class="modal-content">
      <span class="fechar" onclick="fecharModal()">&times;</span>
      <h2 id="tituloProduto"></h2>
      <div id="conteudoDetalhes">
        <!-- conteúdo dinâmico via JS -->
      </div>
    </div>
  </div>

  <!-- RODAPÉ -->
  <!-- <footer class="footer">
    <p>© 2025 Vidraçaria | Todos os direitos reservados</p>
  </footer> -->

  <script src="../js/listar_produtos.js"></script>
</body>
</html>
