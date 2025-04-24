<?php
include 'conexao.php';

$produtos = [];
$result = $conn->query("SELECT * FROM produtos");

while ($produto = $result->fetch_assoc()) {
  $produto_id = $produto['id'];
  $materiais = [];

  $stmt = $conn->prepare("
    SELECT m.nome, m.peso_kg_m, m.peso_kg_aluminio, pm.quantidade
    FROM produto_materiais pm
    JOIN materiais m ON m.id = pm.material_id
    WHERE pm.produto_id = ?
  ");
  $stmt->bind_param("i", $produto_id);
  $stmt->execute();
  $resMateriais = $stmt->get_result();

  while ($mat = $resMateriais->fetch_assoc()) {
    $materiais[] = $mat;
  }

  $produto['materiais'] = $materiais;
  $produtos[] = $produto;
}

echo json_encode($produtos, JSON_PRETTY_PRINT);
$conn->close();
?>
