let todosClientes = [];
const clientesPorPagina = 20;
let paginaAtual = 1;

function exibirClientes(pagina = 1) {
  const tbody = document.getElementById("lista-clientes");
  tbody.innerHTML = "";

  const inicio = (pagina - 1) * clientesPorPagina;
  const fim = inicio + clientesPorPagina;
  const clientesPagina = todosClientes.slice(inicio, fim);

  clientesPagina.forEach(c => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${c.nome}</td>
      <td>${c.telefone}</td>
      <td>${c.email}</td>
      <td>${c.cep}</td>
      <td>${c.endereco}</td>
      <td>${c.numero}</td>
      <td>${c.cidade}</td>
      <td>${c.estado}</td>
    `;
    tbody.appendChild(tr);
  });

  renderizarPaginacao();
}

function renderizarPaginacao() {
  const divPaginacao = document.getElementById("paginacao");
  const totalPaginas = Math.ceil(todosClientes.length / clientesPorPagina);
  divPaginacao.innerHTML = "";

  for (let i = 1; i <= totalPaginas; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.classList.toggle("ativo", i === paginaAtual);
    btn.onclick = () => {
      paginaAtual = i;
      exibirClientes(paginaAtual);
    };
    divPaginacao.appendChild(btn);
  }
}

function aplicarFiltro() {
  const termo = document.getElementById("filtro").value.toLowerCase();
  const filtrados = todosClientes.filter(c =>
    c.nome.toLowerCase().includes(termo) ||
    c.telefone.toLowerCase().includes(termo) ||
    c.email.toLowerCase().includes(termo)
  );
  todosClientes = filtrados;
  paginaAtual = 1;
  exibirClientes();
}

document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("../php/listar_clientes.php");
  todosClientes = await response.json();
  document.getElementById("total-clientes").textContent = `Total de clientes: ${todosClientes.length}`;
  exibirClientes();

  document.getElementById("filtro").addEventListener("input", async () => {
    const response = await fetch("../php/listar_clientes.php");
    const dados = await response.json();
    todosClientes = dados;
    aplicarFiltro();
    document.getElementById("total-clientes").textContent = `Total de clientes: ${todosClientes.length}`;
  });
});