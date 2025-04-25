<?php
include '../conexao.php';

header('Content-Type: application/json');

$idProduto = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($idProduto === 0) {
    echo json_encode(['erro' => 'ID do produto inválido.']);
    exit;
}

$stmt = $conn->prepare("SELECT preco FROM precos_vidros WHERE produto_id = ?");
$stmt->bind_param("i", $idProduto);
$stmt->execute();
$result = $stmt->get_result();

if ($result && $row = $result->fetch_assoc()) {
    echo json_encode(['preco' => floatval($row['preco'])]);
} else {
    echo json_encode(['preco' => 0]); // fallback se não houver preço cadastrado
}

$conn->close();
?>
