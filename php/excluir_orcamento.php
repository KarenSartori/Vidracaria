<?php
require 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $id = $_POST['id'];
  $caminho = $_POST['caminho'];

  $stmt = $conn->prepare("DELETE FROM orcamentos WHERE id = ?");
  $stmt->bind_param("i", $id);

  if ($stmt->execute()) {
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
