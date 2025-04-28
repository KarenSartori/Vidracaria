<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Materiais - Vidraçaria</title>
  <link rel="stylesheet" href="../css/menu.css">
  <link rel="stylesheet" href="../css/listar_materiais.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <style>
    #modal-editar {
      display: none;
      position: fixed;
      top: 50%;
      left: 50%;
      width: 400px;
      transform: translate(-50%, -50%);
      background: #fff;
      padding: 25px;
      border-radius: 12px;
      box-shadow: 0 0 15px rgba(0,0,0,0.3);
      z-index: 1000;
    }
    #modal-editar input {
      width: 100%;
      padding: 10px;
      margin-bottom: 12px;
      border-radius: 8px;
      border: 1px solid #ccc;
    }
    #overlay {
      display: none;
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background-color: rgba(0, 0, 0, 0.4);
      z-index: 900;
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

        <button class="logout-button" onclick="window.location.href='login.html'">
          <i class="fa-solid fa-right-from-bracket"></i> Sair
        </button>
      </div>
      <h2>Lista de Materiais</h2>
      <button class="btn-salvar" style="margin-bottom: 15px;" onclick="abrirNovo()">+ Cadastrar Novo Material</button>
      
      <h2>Preço Alumínio</h2>
      <div id="tabela-materiais"></div>

      <h2>Preços de Vidros</h2>
      <div id="tabela-vidros"></div>

      <h2>Preços de Fechaduras</h2>
      <div id="tabela-fechaduras"></div>

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
  
      <label>Valor (kg alumínio):</label>
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
