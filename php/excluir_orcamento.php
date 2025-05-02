<?php
require 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $id = isset($_POST['id']) ? intval($_POST['id']) : 0;
  $caminho = isset($_POST['caminho']) ? $_POST['caminho'] : '';

  if ($id === 0 || empty($caminho)) {
    http_response_code(400);
    echo "ID ou caminho inválido.";
    exit;
  }

  $stmt = $conn->prepare("DELETE FROM orcamentos WHERE id = ?");
  $stmt->bind_param("i", $id);

  if ($stmt->execute()) {
    $caminhoReal = realpath($caminho);
    if ($caminhoReal && file_exists($caminhoReal)) {
      if (!unlink($caminhoReal)) {
        echo "Registro removido do banco, mas erro ao excluir o arquivo: permissão ou uso em outro processo.";
        exit;
      }
    }
    echo "Orçamento excluído com sucesso.";
  } else {
    http_response_code(500);
    echo "Erro ao excluir do banco.";
  }

  $stmt->close();
  $conn->close();
}
?>
