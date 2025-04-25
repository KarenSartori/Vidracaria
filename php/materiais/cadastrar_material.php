<?php
include '../conexao.php';

$nome = $_POST['nome'];
$peso_kg_m = $_POST['peso_kg_m'];
$peso_kg_aluminio = $_POST['peso_kg_aluminio'];

$stmt = $conn->prepare("INSERT INTO materiais (nome, peso_kg_m, peso_kg_aluminio) VALUES (?, ?, ?)");
$stmt->bind_param("sdd", $nome, $peso_kg_m, $peso_kg_aluminio);
$stmt->execute();
?>
