<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if (empty($_POST['cliente_id']) || empty($_POST['data_hora'])) {
    http_response_code(400);
    exit;
  }

  $clienteId = $_POST['cliente_id'];
  $dataHora = $_POST['data_hora'];

  if (!isset($_FILES['pdf']) || $_FILES['pdf']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    exit;
  }

  $pdf = $_FILES['pdf'];
  $nomeArquivo = basename($pdf['name']);
  $destino = '../orcamentos/' . $nomeArquivo;

  if (!move_uploaded_file($pdf['tmp_name'], $destino)) {
    http_response_code(500);
    exit;
  }

  $data = DateTime::createFromFormat('d/m/Y H:i:s', $dataHora)
      ?: DateTime::createFromFormat('d/m/Y H:i', $dataHora);
  $dataFormatada = $data ? $data->format('Y-m-d H:i:s') : null;

  if (!$dataFormatada) {
    http_response_code(400);
    exit;
  }

  require 'conexao.php';
  $stmt = $conn->prepare("INSERT INTO orcamentos (cliente_id, nome_arquivo, data_hora, caminho_arquivo) VALUES (?, ?, ?, ?)");
  $stmt->bind_param("isss", $clienteId, $nomeArquivo, $dataFormatada, $destino);

  if ($stmt->execute()) {
    http_response_code(200);
  } else {
    http_response_code(500);
  }

  $stmt->close();
  $conn->close();
}
?>