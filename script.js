const init = {
  btnCadastrar: document.getElementById("btnCadastrar"),
  btnSalvar: document.getElementById("btnSalvar"),
  btnCancelar: document.getElementById("btnCancelar"),
  inputPesquisa: document.getElementById("inputPesquisa"),
};

// Limpa os campos de entrada
function limparCampos(dados) {
  for (const campo in dados) {
    document.getElementById(campo).value = "";
  }
}

// Verifica se algum campo está vazio
function camposEstaoVazios(dados) {
  for (const campo in dados) {
    if (dados[campo] === "") {
      alert("Por favor, preencha todos os campos antes de salvar.");
      return true;
    }
  }
}

// Bloqueia ou desbloqueia campos de entrada
function bloquearDesbloquearCampos(campos, bloquear) {
  for (const campo in campos) {
    if (campos.hasOwnProperty(campo)) {
      const elemento = campos[campo];
      if (elemento) {
        elemento.readOnly = bloquear;
      }
    }
  }
}

// Faz uma requisição HTTP genérica
async function fazerRequisicaoHTTP(metodo, url, data) {
  try {
    const resposta = await fetch(url, {
      method: metodo,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(data),
    });

    if (resposta.status === 200) {
      const respostaData = await resposta.json();
      return respostaData;
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
}

// Faz uma requisição para obter todos os produtos
async function fazerRequisicao() {
  try {
    const resposta = await fetch(
      "http://reserva.laboratorio.app.br:10100/produtos"
    );
    if (resposta.status === 200) {
      const data = await resposta.json();
      lerTodos(data);
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
}

// Faz uma requisição para obter um produto por ID
async function fazerRequisicaoPorID(id) {
  try {
    const resposta = await fetch(
      `http://reserva.laboratorio.app.br:10100/produto/${id}`
    );
    if (resposta.status === 200) {
      const data = await resposta.json();
      lerPorId(data);
    } else if (resposta.status === 404) {
      console.log("ID não encontrado na API");
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
}

// Lê e exibe todos os produtos na tabela
function lerTodos(data) {
  const tabela = document.getElementById("resultadoTabela");
  tabela.innerHTML = "";

  // Ordenação por meio do ID (menor ao maior)
  data.sort((a, b) => a.id - b.id);

  data.forEach(function (item) {
    let row = tabela.insertRow();
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    let cell6 = row.insertCell(5);
    let cell7 = row.insertCell(6);
    let cell8 = row.insertCell(7);

    // Adiciona campos de entrada na tabela
    cell1.innerHTML = `<input type="text" class="inputResultado" id="id_${item.id}" value="${item.id}" readonly>`;
    cell2.innerHTML = `<input type="text" class="inputResultado" id="codBarras_${item.id}" value="${item.codBarras}" readonly>`;
    cell3.innerHTML = `<input type="text" class="inputResultado" id="produto_${item.id}" value="${item.produto}" readonly>`;
    cell4.innerHTML = `<input type="text" class="inputResultado" id="marca_${item.id}" value="${item.marca}" readonly>`;
    cell5.innerHTML = `<input type="text" class="inputResultado" id="modelo_${item.id}" value="${item.modelo}" readonly>`;
    cell6.innerHTML = `<input type="text" class="inputResultado" id="valor_${item.id}" value="${item.valor}" readonly>`;
    cell7.innerHTML = `<button id="editar" class="btnEditar" onclick="editarItem(${item.id})">Editar</button>`;
    cell8.innerHTML = `<button id="deletar" class="btnDeletar" onclick="deletar(${item.id})">Deletar</button>`;
  });
}

// Lê e exibe um produto por ID na tabela
function lerPorId(item) {
  const tabela = document.getElementById("resultadoTabela");
  tabela.innerHTML = "";

  let row = tabela.insertRow();
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  let cell3 = row.insertCell(2);
  let cell4 = row.insertCell(3);
  let cell5 = row.insertCell(4);
  let cell6 = row.insertCell(5);
  let cell7 = row.insertCell(6);
  let cell8 = row.insertCell(7);

  // Adiciona campos de entrada na tabela
  cell1.innerHTML = `<input type="text" class="inputResultado" id="id_${item.id}" value="${item.id}" readonly>`;
  cell2.innerHTML = `<input type="text" class="inputResultado" id="codBarras_${item.id}" value="${item.codBarras}" readonly>`;
  cell3.innerHTML = `<input type="text" class="inputResultado" id="produto_${item.id}" value="${item.produto}" readonly>`;
  cell4.innerHTML = `<input type="text" class="inputResultado" id="marca_${item.id}" value="${item.marca}" readonly>`;
  cell5.innerHTML = `<input type="text" class="inputResultado" id="modelo_${item.id}" value="${item.modelo}" readonly>`;
  cell6.innerHTML = `<input type="text" class="inputResultado" id="valor_${item.id}" value="${item.valor}" readonly>`;
  cell7.innerHTML = `<button id="editar" class="btnEditar" onclick="editarItem(${item.id})">Editar</button>`;
  cell8.innerHTML = `<button id="deletar" class="btnDeletar" onclick="deletar(${item.id})">Deletar</button>`;
}

// Cadastra um novo produto
async function cadastrar() {
  const dadosProduto = {
    id: parseInt(document.getElementById("id").value),
    codBarras: document.getElementById("codBarras").value,
    produto: document.getElementById("produto").value,
    marca: document.getElementById("marca").value,
    modelo: document.getElementById("modelo").value,
    valor: document.getElementById("valor").value,
  };

  if (!camposEstaoVazios(dadosProduto)) {
    try {
      await fazerRequisicaoHTTP(
        "POST",
        "http://reserva.laboratorio.app.br:10100/produto",
        dadosProduto
      );
      fazerRequisicao();
      limparCampos(dadosProduto);
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
    }
  }
}

// Deleta um produto pelo ID
async function deletar(id) {
  try {
    await fazerRequisicaoHTTP(
      "DELETE",
      `http://reserva.laboratorio.app.br:10100/produto/${id}`
    );
    fazerRequisicao();
  } catch (error) {
    console.error("Erro ao deletar:", error);
  }
}


// Envia as alterações de um produto
async function enviarEdicao(id, novoProduto) {
  try {
    await fazerRequisicaoHTTP(
      "PUT",
      `http://reserva.laboratorio.app.br:10100/produto/${id}`,
      novoProduto
    );
    fazerRequisicao();
  } catch (error) {
    console.error("Erro ao enviar edição:", error);
  }
}


// Edita um produto
function editarItem(id) {
  init.btnSalvar.style.display = "block";
  init.btnCancelar.style.display = "block";

  const camposEditar = {
    id: document.getElementById(`id_${id}`),
    codBarras: document.getElementById(`codBarras_${id}`),
    produto: document.getElementById(`produto_${id}`),
    marca: document.getElementById(`marca_${id}`),
    modelo: document.getElementById(`modelo_${id}`),
    valor: document.getElementById(`valor_${id}`),
  };

  const valoresOriginais = {
    id: camposEditar.id.value,
    codBarras: camposEditar.codBarras.value,
    produto: camposEditar.produto.value,
    marca: camposEditar.marca.value,
    modelo: camposEditar.modelo.value,
    valor: camposEditar.valor.value,
  };

  bloquearDesbloquearCampos(camposEditar, false);

  init.btnSalvar.addEventListener("click", async () => {
    const novosDadosProduto = {
      id: camposEditar.id.value,
      codBarras: camposEditar.codBarras.value,
      produto: camposEditar.produto.value,
      marca: camposEditar.marca.value,
      modelo: camposEditar.modelo.value,
      valor: camposEditar.valor.value,
    };

    if (!camposEstaoVazios(novosDadosProduto)) {
      await enviarEdicao(id, novosDadosProduto);
      bloquearDesbloquearCampos(camposEditar, true);
      init.btnSalvar.style.display = "none";
      init.btnCancelar.style.display = "none";
    }
  });

  init.btnCancelar.addEventListener("click", () => {
    camposEditar.id.value= valoresOriginais.id;
    camposEditar.codBarras.value = valoresOriginais.codBarras;
    camposEditar.produto.value = valoresOriginais.produto;
    camposEditar.marca.value = valoresOriginais.marca;
    camposEditar.modelo.value = valoresOriginais.modelo;
    camposEditar.valor.value = valoresOriginais.valor;

    bloquearDesbloquearCampos(camposEditar, true);

    init.btnSalvar.style.display = "none";
    init.btnCancelar.style.display = "none";
  });
}

// Adicionando eventos aos botões
init.btnCadastrar.addEventListener("click", cadastrar);

init.inputPesquisa.addEventListener("input", () => {
  const idPesquisa = init.inputPesquisa.value;
  idPesquisa !== "" ? fazerRequisicaoPorID(idPesquisa) : fazerRequisicao();
});

// Iniciando a primeira requisição
fazerRequisicao();