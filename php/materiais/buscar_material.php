<?php
include '../conexao.php';

$id = $_GET['id'];
$stmt = $conn->prepare("SELECT * FROM materiais WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();
$material = $result->fetch_assoc();

echo json_encode($material);
?>
