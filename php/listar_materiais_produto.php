<?php
include 'conexao.php';

if (!isset($_GET['id'])) {
  echo json_encode(["erro" => "Produto não informado"]);
  exit;
}

$id = intval($_GET['id']);
$materiais = [];

$stmt = $conn->prepare("
  SELECT m.nome, m.peso_kg_m, m.peso_kg_aluminio, pm.quantidade, pm.tipo_calculo
  FROM produto_materiais pm
  JOIN materiais m ON m.id = pm.material_id
  WHERE pm.produto_id = ?
");
$stmt->bind_param("i", $id);
$stmt->execute();
$res = $stmt->get_result();

while ($row = $res->fetch_assoc()) {
  $materiais[] = $row;
}

echo json_encode($materiais, JSON_PRETTY_PRINT);
$conn->close();
?>
