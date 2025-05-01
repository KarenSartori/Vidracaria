<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Histórico de Orçamentos</title>
  <link rel="stylesheet" href="../css/menu.css">
  <link rel="stylesheet" href="../css/listar_orcamentos.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
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

      <div class="section-header">
        <h2>Histórico de Orçamentos</h2>
        </div>

        <div class="filtros">
        <input type="text" id="busca" placeholder="Buscar por nome ou data...">
        <select id="filtroCliente">
            <option value="">Todos os clientes</option>
        </select>
        </div>
        <div style="display: flex; justify-content: center; margin-bottom: 20px;">
            <button class="btn-exportar" onclick="exportarParaExcel()">
                <i class="fa-solid fa-file-excel"></i> Exportar para Excel
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

    <script src="../js/listar_orcamentos.js"></script>
</body>
</html>
