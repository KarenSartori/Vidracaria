<?php
require 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $id = $_POST['id'];
  $caminho = $_POST['caminho'];

  // 1. Exclui do banco
  $stmt = $conn->prepare("DELETE FROM orcamentos WHERE id = ?");
  $stmt->bind_param("i", $id);

  if ($stmt->execute()) {
    // 2. Exclui o arquivo, se existir
    if (file_exists($caminho)) {
      unlink($caminho);
    }
    echo "Orçamento excluído com sucesso.";
  } else {
    echo "Erro ao excluir do banco.";
  }

  $stmt->close();
  $conn->close();
}
