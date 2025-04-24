function toggleTipoCliente(tipo) {
    document.getElementById("tipo").value = tipo;
  
    const pfFields = document.querySelectorAll(".pf-only");
    const pjFields = document.querySelectorAll(".pj-only");
  
    if (tipo === "pf") {
      pfFields.forEach(e => e.style.display = "block");
      pjFields.forEach(e => e.style.display = "none");
      document.getElementById('btn-pf').classList.add('active');
      document.getElementById('btn-pj').classList.remove('active');
    } else {
      pfFields.forEach(e => e.style.display = "none");
      pjFields.forEach(e => e.style.display = "block");
      document.getElementById('btn-pf').classList.remove('active');
      document.getElementById('btn-pj').classList.add('active');
    }
  }
  
  window.onload = function () {
    toggleTipoCliente('pf');
};
  

function buscarCep(cep) {
    cep = cep.replace(/\D/g, '');
  
    if (cep.length !== 8) {
      return;
    }
  
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => response.json())
      .then(data => {
        if (data.erro) {
          alert("CEP não encontrado.");
          return;
        }
  
        document.getElementById('endereco').value = data.logradouro || '';
        document.getElementById('cidade').value = data.localidade || '';
        document.getElementById('estado').value = data.uf || '';
      })
      .catch(error => {
        console.error("Erro ao buscar CEP:", error);
      });
  }
  