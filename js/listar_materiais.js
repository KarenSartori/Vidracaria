window.onload = () => {
  fetch('../php/materiais/listar_materiais.php')
    .then(res => res.text())
    .then(html => document.getElementById('tabela-materiais').innerHTML = html);
};

function abrirModalEdicao(id) {
  fetch(`../php/materiais/buscar_material.php?id=${id}`)
    .then(response => response.json())
    .then(material => {
      document.getElementById('modal-titulo').innerText = 'Editar Material';
      document.getElementById('edit-id').value = material.id;
      document.getElementById('edit-nome').value = material.nome;
      document.getElementById('edit-peso_kg_m').value = material.peso_kg_m;
      document.getElementById('edit-peso_kg_aluminio').value = material.peso_kg_aluminio;

      // Remove qualquer submit anterior para evitar duplicidade
      const form = document.getElementById('form-editar');
      form.onsubmit = null;
      form.onsubmit = salvarMaterial;

      mostrarModal();
    })
    .catch(error => {
      console.error('Erro ao carregar material:', error);
      alert('Erro ao carregar os dados do material.');
    });
}

function abrirNovo() {
  document.getElementById('modal-titulo').innerText = 'Cadastrar Novo Material';
  document.getElementById('edit-id').value = '';
  document.getElementById('edit-nome').value = '';
  document.getElementById('edit-peso_kg_m').value = '';
  document.getElementById('edit-peso_kg_aluminio').value = '';
  document.getElementById('form-editar').onsubmit = cadastrarMaterial;
  mostrarModal();
}

function mostrarModal() {
  document.getElementById('modal-editar').style.display = 'block';
  document.getElementById('overlay').style.display = 'block';
}

function fecharModal() {
  document.getElementById('modal-editar').style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
}

function salvarMaterial(e) {
  e.preventDefault();

  const dados = new FormData(document.getElementById('form-editar'));

  fetch('../php/materiais/salvar_material.php', {
    method: 'POST',
    body: dados
  })
    .then(res => res.text())
    .then(msg => {
      console.log("Resposta do servidor:", msg);
      fecharModal();
      location.reload();
    })
    .catch(err => {
      console.error("Erro ao salvar material:", err);
      alert("Erro ao salvar material.");
    });
}

function cadastrarMaterial(e) {
  e.preventDefault();

  const dados = new FormData(document.getElementById('form-editar'));

  fetch('../php/materiais/cadastrar_material.php', {
    method: 'POST',
    body: dados
  })
    .then(() => {
      fecharModal();
      window.location.reload();
    });
}