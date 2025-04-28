<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Cadastro de Cliente - Vidraçaria</title>
  <link rel="stylesheet" href="../css/menu.css">
  <link rel="stylesheet" href="../css/cadastro_cliente.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
</head>
<body>
  <div class="dashboard">
  <?php include 'menu_lateral.php'; ?>

    <!-- CONTEÚDO PRINCIPAL -->
    <main class="main-content">
      <div class="top-actions">
        <button class="btn-voltar-inicio" onclick="window.location.href='menu.php'">
          <i class="fa-solid fa-arrow-left"></i> Início
        </button>

        <button class="logout-button" onclick="window.location.href='login.html'">
          <i class="fa-solid fa-right-from-bracket"></i> Sair
        </button>
      </div>

      <section class="form-section">
        <form action="../php/processa_cliente.php" method="POST" class="form-cadastro">
            <div class="form-grid">
                <div class="col">
                  <div class="form-group tipo-cliente">
                    <label>Tipo de Cliente:</label>
                    <div class="btn-group">
                      <input type="hidden" name="tipo" id="tipo" value="pf">
                      <button type="button" id="btn-pf" class="tipo-btn active" onclick="toggleTipoCliente('pf')">Pessoa Física</button>
                      <button type="button" id="btn-pj" class="tipo-btn" onclick="toggleTipoCliente('pj')">Pessoa Jurídica</button>
                    </div>
                  </div>
              
                  <div class="form-group">
                    <label for="nome">Nome / Razão Social:</label>
                    <input type="text" id="nome" name="nome" required>
                  </div>
              
                  <div class="form-group pf-only">
                    <label for="cpf">CPF:</label>
                    <input type="text" id="cpf" name="cpf">
                  </div>
              
                  <div class="form-group pj-only">
                    <label for="cnpj">CNPJ:</label>
                    <input type="text" id="cnpj" name="cnpj">
                  </div>
              
                  <div class="form-group">
                    <label for="telefone">Telefone:</label>
                    <input type="tel" id="telefone" name="telefone" required>
                  </div>
              
                  <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email">
                  </div>
                </div>
              
                <div class="col">
                  <div class="form-group">
                    <label for="cep">CEP:</label>
                    <input type="text" id="cep" name="cep" maxlength="9" required onblur="buscarCep(this.value)">
                  </div>
              
                  <div class="form-group">
                    <label for="endereco">Rua:</label>
                    <input type="text" id="endereco" name="endereco" required>
                  </div>
              
                  <div class="form-group">
                    <label for="numero">Número:</label>
                    <input type="text" id="numero" name="numero" required>
                  </div>
              
                  <div class="form-group">
                    <label for="complemento">Complemento:</label>
                    <input type="text" id="complemento" name="complemento">
                  </div>
              
                  <div class="form-group">
                    <label for="cidade">Cidade:</label>
                    <input type="text" id="cidade" name="cidade" required>
                  </div>
              
                  <div class="form-group">
                    <label for="estado">Estado:</label>
                    <input type="text" id="estado" name="estado" required>
                  </div>
                </div>
              </div>   
            
              <div class="form-buttons">
                <button type="submit">Cadastrar</button>
                <a href="menu.html" class="voltar">Voltar</a>
              </div>
        </form>
      </section>
    </main>
  </div>

  <!-- RODAPÉ -->
  <!-- <footer class="footer">
    <p>© 2025 Vidraçaria | Todos os direitos reservados</p>
  </footer> -->

  <script src="../js/cadastro_cliente.js"></script>
</body>
</html>
