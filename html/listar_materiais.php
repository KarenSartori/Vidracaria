<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Materiais - Vidraçaria</title>
  <link rel="stylesheet" href="../css/menu.css">
  <link rel="stylesheet" href="../css/listar_materiais.css">
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
      <div class="header-materiais">
        <h2>Lista de Materiais</h2>
        <button class="btn-cadastrar" onclick="abrirNovo()">
          <i class="fa fa-plus"></i> Novo Material
        </button>
      </div>
      <div id="tabela-materiais"></div>
    </main>
  </div>

  <!-- Modal -->
  <div id="overlay" onclick="fecharModal()"></div>
  <div id="modal-editar">
    <button class="fechar-modal" onclick="fecharModal()">&times;</button>
    <h3 id="modal-titulo">Editar Material</h3>
    <form id="form-editar">
      <input type="hidden" name="id" id="edit-id">
  
      <label>Nome:</label>
      <input type="text" name="nome" id="edit-nome" required>
  
      <label>Peso (kg/m):</label>
      <input type="number" step="0.001" name="peso_kg_m" id="edit-peso_kg_m">
  
      <label>Valor (R$):</label>
      <input type="number" step="0.001" name="peso_kg_aluminio" id="edit-peso_kg_aluminio">
  
      <button type="submit" class="btn-salvar" id="btn-submit">Salvar</button>
    </form>
  </div>  

    <!-- <footer class="footer">
        <p>© 2025 Vidraçaria | Todos os direitos reservados</p>
    </footer> -->

    <script src="../js/listar_materiais.js"></script>
</body>
</html>
