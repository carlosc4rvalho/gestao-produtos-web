const init = {
  btnCadastrar: document.getElementById("btnCadastrar"), // Botão de cadastro
  btnSalvar: document.getElementById("btnSalvar"), // Botão de salvar
  btnCancelar: document.getElementById("btnCancelar"), // Botão de cancelar
  inputPesquisa: document.getElementById("inputPesquisa"), // Campo de pesquisa
};

// Função para limpar os campos de entrada
function limparCampos(dados) {
  for (const campo in dados) {
    // Limpa o valor do campo de entrada
    document.getElementById(campo).value = "";
  }
}

// Função para verificar se algum campo está vazio
function camposEstaoVazios(dados) {
  for (const campo in dados) {
    if (dados[campo] === "") {
      // Mostra um alerta se algum campo estiver vazio
      alert("Por favor, preencha todos os campos antes de salvar.");
      return true;
    }
  }
}

// Função para bloquear ou desbloquear campos de entrada
function bloquearDesbloquearCampos(campos, bloquear) {
  for (const campo in campos) {
    if (campos.hasOwnProperty(campo)) {
      const elemento = campos[campo];
      if (elemento) {
        // Define o campo de entrada como somente leitura (readOnly)
        elemento.readOnly = bloquear;
      }
    }
  }
}

// Função genérica para fazer uma requisição HTTP
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
      // Se a resposta for bem-sucedida, retorna os dados da resposta
      const respostaData = await resposta.json();
      return respostaData;
    }
  } catch (error) {
    // Em caso de erro na requisição, exibe uma mensagem de erro
    console.error("Erro na requisição:", error);
  }
}

// Função para fazer uma requisição e obter todos os produtos
async function fazerRequisicao() {
  try {
    const resposta = await fetch(
      "http://reserva.laboratorio.app.br:10100/produtos"
    );
    if (resposta.status === 200) {
      // Se a resposta for bem-sucedida, lê os dados e exibe na tabela
      const data = await resposta.json();
      lerTodos(data);
    }
  } catch (error) {
    // Em caso de erro na requisição, exibe uma mensagem de erro
    console.error("Erro na requisição:", error);
  }
}

// Função para fazer uma requisição e obter um produto por ID
async function fazerRequisicaoPorID(id) {
  try {
    const resposta = await fetch(
      `http://reserva.laboratorio.app.br:10100/produto/${id}`
    );
    if (resposta.status === 200) {
      // Se a resposta for bem-sucedida, lê os dados e exibe na tabela
      const data = await resposta.json();
      lerPorId(data);
    } else if (resposta.status === 404) {
      // Se o ID não for encontrado na API, exibe uma mensagem de aviso
      console.log("ID não encontrado na API");
    }
  } catch (error) {
    // Em caso de erro na requisição, exibe uma mensagem de erro
    console.error("Erro na requisição:", error);
  }
}

// Função para ler e exibir todos os produtos na tabela
function lerTodos(data) {
  const tabela = document.getElementById("resultadoTabela");
  tabela.innerHTML = "";

  // Ordena os dados por ID (do menor ao maior)
  data.sort((a, b) => a.id - b.id);

  data.forEach(function (item) {
    // Cria linhas e células na tabela para exibir os produtos
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
    cell4.innerHTML = `<input type:text" class="inputResultado" id="marca_${item.id}" value="${item.marca}" readonly>`;
    cell5.innerHTML = `<input type="text" class="inputResultado" id="modelo_${item.id}" value="${item.modelo}" readonly>`;
    cell6.innerHTML = `<input type="text" class="inputResultado" id="valor_${item.id}" value="${item.valor}" readonly>`;
    cell7.innerHTML = `<button id="editar" class="btnEditar" onclick="editarItem(${item.id})">Editar</button>`;
    cell8.innerHTML = `<button id="deletar" class="btnDeletar" onclick="deletar(${item.id})">Deletar</button>`;
  });
}

// Função para ler e exibir um produto por ID na tabela
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

// Função para cadastrar um novo produto
async function cadastrar() {
  // Obtém os dados do produto a ser cadastrado
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
      // Faz uma requisição HTTP POST para cadastrar o produto
      await fazerRequisicaoHTTP(
        "POST",
        "http://reserva.laboratorio.app.br:10100/produto",
        dadosProduto
      );
      // Atualiza a tabela e limpa os campos de entrada
      fazerRequisicao();
      limparCampos(dadosProduto);
    } catch (error) {
      // Em caso de erro no cadastro, exibe uma mensagem de erro
      console.error("Erro ao cadastrar:", error);
    }
  }
}

// Função para deletar um produto pelo ID
async function deletar(id) {
  try {
    // Faz uma requisição HTTP DELETE para deletar o produto
    await fazerRequisicaoHTTP(
      "DELETE",
      `http://reserva.laboratorio.app.br:10100/produto/${id}`
    );
    // Atualiza a tabela após a exclusão
    fazerRequisicao();
  } catch (error) {
    // Em caso de erro na exclusão, exibe uma mensagem de erro
    console.error("Erro ao deletar:", error);
  }
}

// Função para enviar as alterações de um produto
async function enviarEdicao(id, novoProduto) {
  try {
    // Faz uma requisição HTTP PUT para enviar as alterações
    await fazerRequisicaoHTTP(
      "PUT",
      `http://reserva.laboratorio.app.br:10100/produto/${id}`,
      novoProduto
    );
    // Atualiza a tabela após a edição
    fazerRequisicao();
  } catch (error) {
    // Em caso de erro na edição, exibe uma mensagem de erro
    console.error("Erro ao enviar edição:", error);
  }
}

// Função para editar um produto
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
    // Obtém os novos dados do produto a ser editado
    const novosDadosProduto = {
      id: camposEditar.id.value,
      codBarras: camposEditar.codBarras.value,
      produto: camposEditar.produto.value,
      marca: camposEditar.marca.value,
      modelo: camposEditar.modelo.value,
      valor: camposEditar.valor.value,
    };

    if (!camposEstaoVazios(novosDadosProduto)) {
      // Envia as alterações do produto
      await enviarEdicao(id, novosDadosProduto);
      bloquearDesbloquearCampos(camposEditar, true);
      init.btnSalvar.style.display = "none";
      init.btnCancelar.style.display = "none";
    }
  });

  init.btnCancelar.addEventListener("click", () => {
    // Restaura os valores originais dos campos de edição
    camposEditar.id.value = valoresOriginais.id;
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

// Adicionando eventos aos botões e campos
init.btnCadastrar.addEventListener("click", cadastrar);

init.inputPesquisa.addEventListener("input", () => {
  const idPesquisa = init.inputPesquisa.value;
  // Realiza uma pesquisa por ID se o campo de pesquisa não estiver vazio
  idPesquisa !== "" ? fazerRequisicaoPorID(idPesquisa) : fazerRequisicao();
});

// Iniciando a primeira requisição ao carregar a página
fazerRequisicao();
