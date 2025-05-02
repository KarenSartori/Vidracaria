<?php
include 'conexao.php';

$tipo = $_POST['tipo'] ?? 'pf';
$nome = $_POST['nome'];
$cpf = $_POST['cpf'] ?? null;
$cnpj = $_POST['cnpj'] ?? null;
$telefone = $_POST['telefone'];
$email = $_POST['email'];
$endereco = $_POST['endereco'];
$cep = $_POST['cep'];
$cidade = $_POST['cidade'];
$estado = $_POST['estado'];
$numero = $_POST['numero'];
$complemento = $_POST['complemento'];

if (empty($nome) || empty($telefone) || empty($endereco)) {
    echo "Campos obrigatórios não preenchidos.";
    exit;
}

if ($tipo === 'pf' && $cpf) {
    $verificaSql = "SELECT id FROM clientes WHERE cpf = ?";
    $verificaStmt = $conn->prepare($verificaSql);
    $verificaStmt->bind_param("s", $cpf);
    $verificaStmt->execute();
    $verificaStmt->store_result();

    if ($verificaStmt->num_rows > 0) {
        echo "<script>alert('CPF já cadastrado no sistema.'); window.location.href='../html/cadastro_cliente.php';</script>";
        $verificaStmt->close();
        $conn->close();
        exit;
    }
    $verificaStmt->close();
}

if ($tipo === 'pf') {
    $sql = "INSERT INTO clientes (tipo, nome, cpf, telefone, email, endereco, cep, numero, complemento, cidade, estado) 
            VALUES ('pf', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssssssss", $nome, $cpf, $telefone, $email, $endereco, $cep, $numero, $complemento, $cidade, $estado);
} else {
    $sql = "INSERT INTO clientes (tipo, nome, cnpj, telefone, email, endereco, cep, numero, complemento, cidade, estado) 
            VALUES ('pj', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssssssss", $nome, $cnpj, $telefone, $email, $endereco, $cep, $numero, $complemento, $cidade, $estado);
}

if ($stmt->execute()) {
    echo "<script>alert('Cliente cadastrado com sucesso!'); window.location.href='../html/cadastro_cliente.php';</script>";
} else {
    echo "Erro ao cadastrar: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
