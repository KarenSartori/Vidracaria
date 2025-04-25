<?php
include '../conexao.php';

$id = $_GET['id'];
$preco = $_GET['preco'];

$stmt = $conn->prepare("UPDATE precos_fechaduras SET preco = ? WHERE id = ?");
$stmt->bind_param("di", $preco, $id);
$stmt->execute();
?>
