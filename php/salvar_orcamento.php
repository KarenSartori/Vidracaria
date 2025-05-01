<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $clienteId = $_POST['cliente_id'];
  $dataHora = $_POST['data_hora'];

  if (!isset($_FILES['pdf']) || $_FILES['pdf']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo "Erro ao fazer upload do PDF.";
    exit;
  }

  $pdf = $_FILES['pdf'];
  $nomeArquivo = basename($pdf['name']);
  $destino = '../orcamentos/' . $nomeArquivo;

  if (!move_uploaded_file($pdf['tmp_name'], $destino)) {
    http_response_code(500);
    echo "Erro ao mover o arquivo.";
    exit;
  }

  require 'conexao.php'; // ajuste conforme seu projeto
  $stmt = $conn->prepare("INSERT INTO orcamentos (cliente_id, nome_arquivo, data_hora, caminho_arquivo) VALUES (?, ?, ?, ?)");
  $stmt->bind_param("isss", $clienteId, $nomeArquivo, date('Y-m-d H:i:s', strtotime($dataHora)), $destino);

  if ($stmt->execute()) {
    echo "Orçamento salvo com sucesso.";
  } else {
    http_response_code(500);
    echo "Erro ao salvar no banco.";
  }

  $stmt->close();
  $conn->close();
}
?>
