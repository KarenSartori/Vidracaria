document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    if (username === "admin" && password === "1234") {
      window.location.href = "../html/menu.php";
    } else {
      document.getElementById("errorMessage").textContent = "Usuário ou senha inválidos.";
    }
  });
  
  const togglePassword = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");
  
  togglePassword.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    togglePassword.classList.toggle("fa-eye");
    togglePassword.classList.toggle("fa-eye-slash");
  });
  