<?php
include 'conexao.php';

$clientes = [];
$result = $conn->query("SELECT nome, telefone, email, endereco, cep, numero, cidade, estado FROM clientes");

while ($row = $result->fetch_assoc()) {
  $clientes[] = $row;
}

echo json_encode($clientes, JSON_UNESCAPED_UNICODE);
$conn->close();
?>
