<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Histórico de Orçamentos</title>
  <link rel="stylesheet" href="../css/menu.css">
  <link rel="stylesheet" href="../css/listar_orcamentos.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/themes/material_blue.css">
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

      <div class="section-header">
        <h2>Histórico de Orçamentos</h2>
        </div>

        <div class="filtros">
          <input type="text" id="busca" placeholder="Buscar por nome">
          <input type="text" id="filtroData" placeholder="Selecionar período" readonly>
          <button id="limparFiltros" title="Limpar filtros">
            <i class="fa-solid fa-xmark"></i>Limpar
          </button>
        </div>

      <table class="orcamento-tabela" id="tabelaOrcamentos">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Data e Hora</th>
            <th>Arquivo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </main>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
  <script src="https://cdn.jsdelivr.net/npm/flatpickr/dist/l10n/pt.js"></script>
  <script src="../js/listar_orcamentos.js"></script>

</body>
</html>
