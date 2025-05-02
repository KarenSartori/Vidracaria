let orcamentos = [];

async function carregarOrcamentos() {
  const resp = await fetch('../php/listar_orcamentos.php');
  orcamentos = await resp.json();
  popularClientes();
  renderizarTabela();
}

function popularClientes() {
  const clientes = [...new Set(orcamentos.map(o => o.nome_cliente))];
  const select = document.getElementById('filtroCliente');
  clientes.forEach(nome => {
    const opt = document.createElement('option');
    opt.value = nome;
    opt.textContent = nome;
    select.appendChild(opt);
  });
}

function renderizarTabela() {
  const tbody = document.querySelector('#tabelaOrcamentos tbody');
  tbody.innerHTML = '';

  const busca = document.getElementById('busca').value.toLowerCase();
  const filtroCliente = document.getElementById('filtroCliente').value;

  const resultados = orcamentos.filter(o => {
    const matchBusca = o.nome_cliente.toLowerCase().includes(busca) ||
                       o.data_hora.toLowerCase().includes(busca);
    const matchCliente = filtroCliente === '' || o.nome_cliente === filtroCliente;
    return matchBusca && matchCliente;
  });

  resultados.forEach(o => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${o.nome_cliente}</td>
      <td>${formatarData(o.data_hora)}</td>
      <td>${o.nome_arquivo}</td>
      <td>
        <button class="btn-ver-pdf" onclick="window.open('${o.caminho_arquivo}', '_blank')" title="Ver PDF">
          <i class="fa-solid fa-file-pdf"></i> PDF
        </button>
        <button class="btn-excluir" onclick="deletarOrcamento(${o.id}, '${o.caminho_arquivo}')" title="Excluir Orçamento">
          <i class="fa-solid fa-trash"></i> Excluir
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function formatarData(data) {
  const d = new Date(data);
  return d.toLocaleDateString('pt-BR') + ' ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

document.addEventListener('DOMContentLoaded', () => {
  carregarOrcamentos();
  document.getElementById('busca').addEventListener('input', renderizarTabela);
  document.getElementById('filtroCliente').addEventListener('change', renderizarTabela);
});

async function deletarOrcamento(id, caminhoArquivo) {
  if (!confirm("Tem certeza que deseja excluir este orçamento?")) return;

  const form = new FormData();
  form.append('id', id);
  form.append('caminho', caminhoArquivo);

  const resp = await fetch('../php/excluir_orcamento.php', {
    method: 'POST',
    body: form
  });

  const result = await resp.text();

  alert(result);
  carregarOrcamentos();
}