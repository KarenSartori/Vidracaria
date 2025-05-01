<?php
require 'conexao.php';

header('Content-Type: application/json');

$sql = "
  SELECT o.id, o.nome_arquivo, o.data_hora, o.caminho_arquivo, c.nome AS nome_cliente 
  FROM orcamentos o 
  JOIN clientes c ON o.cliente_id = c.id 
  ORDER BY o.data_hora DESC
";

$result = $conn->query($sql);

$orcamentos = [];

while ($row = $result->fetch_assoc()) {
  $orcamentos[] = $row;
}

echo json_encode($orcamentos);
