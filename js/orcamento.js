async function carregarProdutos() {
    const resp = await fetch('../php/listar_produtos.php');
    const produtos = await resp.json();
    const select = document.getElementById('produto');
    produtos.forEach(produto => {
      const option = document.createElement('option');
      option.value = produto.id;
      option.textContent = produto.nome;
      select.appendChild(option);
    });
  }
  
  let materiais = [];
  
  async function carregarMateriaisDoProduto() {
    const produtoId = document.getElementById('produto').value;
    if (!produtoId) return;
  
    const resp = await fetch(`../php/listar_materiais_produto.php?id=${produtoId}`);
    materiais = await resp.json();
  
    if (materiais.erro) {
      alert("Erro: " + materiais.erro);
      return;
    }
  
    const tbody = document.getElementById('tabelaMateriais').querySelector('tbody');
    tbody.innerHTML = "";
  
    materiais.forEach(mat => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${mat.nome}</td>
        <td>${mat.peso_kg_m}</td>
        <td>${mat.peso_kg_aluminio}</td>
        <td>${mat.tipo_calculo}</td>
      `;
      tbody.appendChild(tr);
    });
  
    document.getElementById('areaMateriais').classList.remove('hidden');
  }
  
  function calcularTotal() {
    const largura = parseFloat(document.getElementById("larguraVidro").value);
    const altura = parseFloat(document.getElementById("alturaVidro").value);
    const precoVidro = parseFloat(document.getElementById("precoVidro").value);
  
    if (isNaN(largura) || isNaN(altura) || isNaN(precoVidro)) {
      alert("Preencha todos os campos corretamente!");
      return;
    }
  
    let totalAluminio = 0;
    let log = [];
  
    materiais.forEach(mat => {
      let metro = 0;
      if (mat.tipo_calculo === "largura*2") metro = largura * 2;
      else if (mat.tipo_calculo === "altura*2") metro = altura * 2;
      else if (mat.tipo_calculo === "largura") metro = largura;
      else if (mat.tipo_calculo === "altura") metro = altura;
      else metro = 0;
  
      const peso = parseFloat(mat.peso_kg_m);
      const precoKg = parseFloat(mat.peso_kg_aluminio);
      const subtotal = metro * peso * precoKg;
      totalAluminio += subtotal;
      log.push(`${mat.nome}: ${peso.toFixed(3)}kg/m * ${metro.toFixed(2)}m * R$${precoKg} = R$${subtotal.toFixed(2)}`);
    });
  
    const totalVidro = largura * altura * precoVidro;
  
    const totalComFechadura240 = totalVidro + totalAluminio + 240;
    const totalComFechadura100 = totalVidro + totalAluminio + 100;
  
    const detalhes = `
      <strong>Detalhamento dos cálculos:</strong><br>
      <ul>${log.map(l => `<li>${l}</li>`).join("")}</ul>
      <p>Vidro (R$${precoVidro}/m²): ${largura}m x ${altura}m = <strong>R$${totalVidro.toFixed(2)}</strong></p>
      <p>Alumínio: <strong>R$${totalAluminio.toFixed(2)}</strong></p>
      <hr>
      <h3>Total com Fechadura contra parede (R$240): R$${totalComFechadura240.toFixed(2)}</h3>
      <h3>Total com Bate Fecha (R$100): R$${totalComFechadura100.toFixed(2)}</h3>
    `;
  
    document.getElementById("resultadoFinal").innerHTML = detalhes;
  }
  
  // Inicialização
  carregarProdutos();
  