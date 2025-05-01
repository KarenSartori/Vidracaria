<?php
include 'conexao.php';

header('Content-Type: application/json');

$clientes = [];
$result = $conn->query("SELECT id, nome, email, telefone FROM clientes");

if ($result) {
  while ($cliente = $result->fetch_assoc()) {
    $clientes[] = $cliente;
  }
}

echo json_encode($clientes);
$conn->close();
?>
