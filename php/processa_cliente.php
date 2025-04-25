<?php
include 'conexao.php';

// Obter dados do formulário
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



// Validação básica
if (empty($nome) || empty($telefone) || empty($endereco)) {
    echo "Campos obrigatórios não preenchidos.";
    exit;
}

// Monta a query conforme o tipo
if ($tipo === 'pf') {
    $sql = "INSERT INTO clientes (tipo, nome, cpf, telefone, email, endereco, cep, numero, complemento, cidade, estado) 
            VALUES ('pf', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssssssss", $nome, $cpf, $telefone, $email, $endereco, $cep, $numero, $complemento, $cidade, $estado);
} else {
    $sql = "INSERT INTO clientes (tipo, nome, cnpj, telefone, email, endereco, cep, cidade, estado) 
            VALUES ('pj', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssssssss", $nome, $cnpj, $telefone, $email, $endereco, $cep, $numero, $complemento, $cidade, $estado);
}

// Executa e verifica
if ($stmt->execute()) {
    echo "<script>alert('Cliente cadastrado com sucesso! - TESTEEEEEEE'); window.location.href='../html/cadastro_cliente.php';</script>";
} else {
    echo "Erro ao cadastrar: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
