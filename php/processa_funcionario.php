<?php
include 'conexao.php';

// Coleta os dados do formulário
$nome = $_POST['nome'];
$cpf = $_POST['cpf'];
$telefone = $_POST['telefone'];
$email = $_POST['email'];
$cargo = $_POST['cargo'];
$data_admissao = $_POST['data_admissao'];

// Prepara a query de inserção
$sql = "INSERT INTO funcionarios (nome, cpf, telefone, email, cargo, data_admissao)
        VALUES (?, ?, ?, ?, ?, ?)";

// Prepara e executa com segurança
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssss", $nome, $cpf, $telefone, $email, $cargo, $data_admissao);

if ($stmt->execute()) {
    echo "<script>
            alert('Funcionário cadastrado com sucesso!');
            window.location.href='../html/cadastro_funcionario.php';
          </script>";
} else {
    echo "Erro ao cadastrar funcionário: " . $conn->error;
}

// Fecha conexão
$stmt->close();
$conn->close();
?>
