let orcamentos = [];

async function carregarOrcamentos() {
  const resp = await fetch('../php/listar_orcamentos.php');
  orcamentos = await resp.json();
  renderizarTabela();
}

function renderizarTabela() {
  const tbody = document.querySelector('#tabelaOrcamentos tbody');
  tbody.innerHTML = '';

  const busca = document.getElementById('busca').value.toLowerCase();
  const dataRange = document.getElementById('filtroData').value;

  const resultados = orcamentos.filter(o => {
    const matchBusca = o.nome_cliente.toLowerCase().includes(busca) 

    let matchData = true;

    if (dataRange) {
      const partes = dataRange.split(/ a | até /);

      const parseData = str => {
        const [d, m, a] = str.split('/');
        return new Date(`${a}-${m}-${d}T00:00:00`);
      };

      const [dataPart, horaPart] = o.data_hora.split(' ');
      const [dia, mes, ano] = dataPart.split('/');
      const [hora, minuto] = horaPart.split(':');
      const dataOrcamento = new Date(Number(ano), Number(mes) - 1, Number(dia), Number(hora), Number(minuto));

      if (partes.length === 1) {
        const dataSelecionada = parseData(partes[0]);
        matchData =
          dataOrcamento.getFullYear() === dataSelecionada.getFullYear() &&
          dataOrcamento.getMonth() === dataSelecionada.getMonth() &&
          dataOrcamento.getDate() === dataSelecionada.getDate();
      }

      if (partes.length === 2) {
        const inicio = parseData(partes[0]);
        const fim = parseData(partes[1]);
        const fimAjustado = new Date(fim.getTime() + 86399999); // fim do dia
        matchData = dataOrcamento >= inicio && dataOrcamento <= fimAjustado;
      }
    }

    return matchBusca && matchData;
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

function formatarData(dataStr) {
  const [dataPart, horaPart] = dataStr.split(' ');
  const [dia, mes, ano] = dataPart.split('/');
  return `${dia}/${mes}/${ano} ${horaPart}`;
}

async function deletarOrcamento(id, caminhoArquivo) {
  if (!confirm("Tem certeza que deseja excluir este orçamento?")) return;

  try {
    const form = new FormData();
    form.append('id', id);
    form.append('caminho', caminhoArquivo);

    const resp = await fetch('../php/excluir_orcamento.php', {
      method: 'POST',
      body: form
    });

    const result = await resp.text();

    if (!resp.ok) {
      console.error('Erro na exclusão:', result);
      alert('Erro ao excluir o orçamento.');
    } else {
      alert(result);
      carregarOrcamentos();
    }

  } catch (err) {
    console.error('Falha na requisição:', err);
    alert('Erro inesperado ao tentar excluir o orçamento.');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  carregarOrcamentos();

  document.getElementById('busca').addEventListener('input', renderizarTabela);
  document.getElementById('filtroData').addEventListener('change', renderizarTabela);

  flatpickr("#filtroData", {
    mode: "range",
    dateFormat: "d/m/Y",
    locale: "pt"
  });
});

document.getElementById('limparFiltros').addEventListener('click', () => {
  document.getElementById('busca').value = '';
  document.getElementById('filtroData')._flatpickr.clear();
  renderizarTabela();
});