<?php
include '../conexao.php';

$id = $_POST['id'];
$nome = $_POST['nome'];
$peso_kg_m = $_POST['peso_kg_m'];
$peso_kg_aluminio = $_POST['peso_kg_aluminio'];

$stmt = $conn->prepare("UPDATE materiais SET nome = ?, peso_kg_m = ?, peso_kg_aluminio = ? WHERE id = ?");
$stmt->bind_param("sddi", $nome, $peso_kg_m, $peso_kg_aluminio, $id);
$stmt->execute();
?>
