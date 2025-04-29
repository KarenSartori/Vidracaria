document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("../php/listar_produtos.php");
    const produtos = await response.json();
  
    const container = document.querySelector(".produtos-container");
  
    produtos.forEach(prod => {
      const card = document.createElement("div");
      card.className = "card-produto";
      card.innerHTML = `
        <h2>${prod.nome}</h2>
        <button class="btn-detalhes" data-prod='${JSON.stringify(prod)}'>Ver Detalhes</button>
      `;
      container.appendChild(card);
    });
  
    document.querySelectorAll(".btn-detalhes").forEach(btn => {
      btn.addEventListener("click", () => {
        const produto = JSON.parse(btn.dataset.prod);
        verDetalhes(produto);
      });
    });
  });
  
  function verDetalhes(produto) {
    document.getElementById("tituloProduto").innerText = produto.nome;
    const divDetalhes = document.getElementById("conteudoDetalhes");
  
    divDetalhes.innerHTML = `
      <table class="tabela-materiais">
        <thead>
          <tr>
            <th>Material</th>
            <th>Peso (kg/m)</th>
            <th>Valor (R$)</th>
          </tr>
        </thead>
        <tbody>
          ${produto.materiais.map(mat => `
            <tr>
              <td>${mat.nome}</td>
              <td>${mat.peso_kg_m}</td>
              <td>${mat.peso_kg_aluminio}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  
    document.getElementById("modalDetalhes").style.display = "flex";
  }
  
  function fecharModal() {
    document.getElementById("modalDetalhes").style.display = "none";
  }
  