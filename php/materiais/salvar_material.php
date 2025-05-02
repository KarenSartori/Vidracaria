<?php
include '../conexao.php';

$id = $_POST['id'] ?? null;
$nome = $_POST['nome'] ?? '';
$peso_kg_m = $_POST['peso_kg_m'] ?? 0;
$peso_kg_aluminio = $_POST['peso_kg_aluminio'] ?? 0;

if (!$id) {
  http_response_code(400);
  echo "ID inválido.";
  exit;
}

$stmt = $conn->prepare("UPDATE materiais SET nome = ?, peso_kg_m = ?, peso_kg_aluminio = ? WHERE id = ?");
if (!$stmt) {
  echo "Erro no prepare: " . $conn->error;
  exit;
}

$stmt->bind_param("sddi", $nome, $peso_kg_m, $peso_kg_aluminio, $id);
if (!$stmt->execute()) {
  echo "Erro ao executar: " . $stmt->error;
  exit;
}

echo "Salvo com sucesso.";
?>
