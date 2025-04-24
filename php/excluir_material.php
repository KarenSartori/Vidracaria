<?php
include 'conexao.php';

$id = $_GET['id'];

$stmt = $conn->prepare("DELETE FROM materiais WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
?>
