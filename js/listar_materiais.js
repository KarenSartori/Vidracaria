window.onload = () => {
    fetch('../php/listar_materiais.php')
      .then(res => res.text())
      .then(html => document.getElementById('tabela-materiais').innerHTML = html);
  }

  function abrirModal(id) {
    fetch('../php/buscar_material.php?id=' + id)
      .then(res => res.json())
      .then(material => {
        document.getElementById('modal-titulo').innerText = 'Editar Material';
        document.getElementById('edit-id').value = material.id;
        document.getElementById('edit-nome').value = material.nome;
        document.getElementById('edit-peso_kg_m').value = material.peso_kg_m;
        document.getElementById('edit-peso_kg_aluminio').value = material.peso_kg_aluminio;
        document.getElementById('form-editar').onsubmit = salvarMaterial;
        mostrarModal();
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
    fetch('../php/salvar_material.php', {
      method: 'POST',
      body: dados
    }).then(() => {
      fecharModal();
      window.location.reload();
    });
  }

  function cadastrarMaterial(e) {
    e.preventDefault();
    const dados = new FormData(document.getElementById('form-editar'));
    fetch('../php/cadastrar_material.php', {
      method: 'POST',
      body: dados
    }).then(() => {
      fecharModal();
      window.location.reload();
    });
  }

  function excluirMaterial(id) {
    if (confirm("Tem certeza que deseja excluir este material?")) {
      fetch('../php/excluir_material.php?id=' + id, {
        method: 'GET'
      }).then(() => {
        window.location.reload();
      });
    }
  }
  