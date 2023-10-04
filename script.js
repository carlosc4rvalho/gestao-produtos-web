// Inicialização por ID para interações futuras
const init = {
  btnCadastrar: document.getElementById("btnCadastrar"),
  btnSalvar: document.getElementById("btnSalvar"),
  btnCancelar: document.getElementById("btnCancelar"),
  inputPesquisa: document.getElementById("inputPesquisa"),
};

// Função para limpar campos
const limparCampos = (dados) => {
  for (const campo in dados) {
    document.getElementById(campo).value = "";
  }
};

// Função para verificar se há campos vazios
const camposEstaoVazios = (dados) => {
  for (const campo in dados) {
    if (dados[campo] === "") {
      alert(
        "Por favor, preencha todos os campos antes de salvar ou cadastrar."
      );
      return true;
    }
  }
};

// Função para bloquear ou desbloquear campos
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

// Função para fazer uma requisição GET
const fazerRequisicao = () => {
  const solicitarDados = new XMLHttpRequest();
  let data = "";

  solicitarDados.onreadystatechange = () => {
    if (solicitarDados.readyState === 4 && solicitarDados.status === 200) {
      data = JSON.parse(solicitarDados.responseText);
      lerTodos(data);
    }
  };

  solicitarDados.open(
    "GET",
    "http://reserva.laboratorio.app.br:10100/produtos",
    true
  );
  solicitarDados.send();
};

// Função para fazer uma requisição GET por ID
const fazerRequisicaoPorID = (id) => {
  const solicitarDados = new XMLHttpRequest();
  let data = "";

  solicitarDados.onreadystatechange = () => {
    if (solicitarDados.readyState === 4) {
      if (solicitarDados.status === 200) {
        data = JSON.parse(solicitarDados.responseText);
        console.log("Dados da API por ID:", data);
        lerPorId(data);
      } else if (solicitarDados.status === 404) {
        console.log("ID não encontrado na API");
      }
    }
  };

  solicitarDados.open(
    "GET",
    "http://reserva.laboratorio.app.br:10100/produto/" + id,
    true
  );
  solicitarDados.send();
};

// Função para ler todos os dados e preencher a tabela
const lerTodos = (data) => {
  const tabela = document.getElementById("resultadoTabela");
  tabela.innerHTML = "";

  console.log(data);

  // Ordenação por meio do id (menor ao maior)
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

    cell1.innerHTML = `<input type="text" class="inputResultado" id="id_${item.id}" value="${item.id}" readonly>`;
    cell2.innerHTML = `<input type="text" class="inputResultado" id="codBarras_${item.id}" value="${item.codBarras}" readonly>`;
    cell3.innerHTML = `<input type="text" class="inputResultado" id="produto_${item.id}" value="${item.produto}" readonly>`;
    cell4.innerHTML = `<input type="text" class="inputResultado" id="marca_${item.id}" value="${item.marca}" readonly>`;
    cell5.innerHTML = `<input type="text" class="inputResultado" id="modelo_${item.id}" value="${item.modelo}" readonly>`;
    cell6.innerHTML = `<input type="text" class="inputResultado" id="valor_${item.id}" value="${item.valor}" readonly>`;
    cell7.innerHTML = `<button id="editar" class="btnEditar" onclick="editarItem(${item.id})">Editar</button>`;
    cell8.innerHTML = `<button id="deletar" class="btnDeletar" onclick="deletar(${item.id})">Deletar</button>`;
  });
};

// Função para ler dados por ID
const lerPorId = (item) => {
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

  cell1.innerHTML = `<input type="text" class="inputResultado" id="id_${item.id}" value="${item.id}" readonly>`;
  cell2.innerHTML = `<input type="text" class="inputResultado" id="codBarras_${item.id}" value="${item.codBarras}" readonly>`;
  cell3.innerHTML = `<input type="text" class="inputResultado" id="produto_${item.id}" value="${item.produto}" readonly>`;
  cell4.innerHTML = `<input type="text" class="inputResultado" id="marca_${item.id}" value="${item.marca}" readonly>`;
  cell5.innerHTML = `<input type="text" class="inputResultado" id="modelo_${item.id}" value="${item.modelo}" readonly>`;
  cell6.innerHTML = `<input type="text" class="inputResultado" id="valor_${item.id}" value="${item.valor}" readonly>`;
  cell7.innerHTML = `<button id="editar" class="btnEditar" onclick="editarItem(${item.id})">Editar</button>`;
  cell8.innerHTML = `<button id="deletar" class="btnDeletar" onclick="deletar(${item.id})">Deletar</button>`;
};

// Função para cadastrar um novo item (muitas vezes ele cadastra e outra vezes não)
const cadastrar = () => {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
      document.getElementById("resposta").value = xhr.responseText;
      fazerRequisicao();
  }
  };
  
  const dados = {
    id: parseInt(document.getElementById("id").value),
    codBarras: document.getElementById("codBarras").value,
    produto: document.getElementById("produto").value,
    marca: document.getElementById("marca").value,
    modelo: document.getElementById("modelo").value,
    valor: document.getElementById("valor").value,
  };

  console.log(dados);
  let envio = JSON.stringify(dados);

  xhr.open("POST", "http://reserva.laboratorio.app.br:10100/produto", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(envio);

  document.getElementById("id").value = "";
  document.getElementById("codBarras").value = "";
  document.getElementById("produto").value = "";
  document.getElementById("marca").value = "";
  document.getElementById("modelo").value = "";
  document.getElementById("valor").value = "";
};

// Função para deletar um item por ID
const deletar = (id) => {
  const solicitarDados = new XMLHttpRequest();
  solicitarDados.onreadystatechange = () => {
    if (solicitarDados.readyState === 4 && solicitarDados.status === 200) {
      document.getElementById("resposta").value = solicitarDados.responseText;
      fazerRequisicao();
    }
  };

  solicitarDados.open(
    "DELETE",
    "http://reserva.laboratorio.app.br:10100/produto/" + id,
    true
  );
  solicitarDados.send();
};

// Função para enviar a edição de um item que acontece na função abaixo
const enviarEdicao = (id, novoProduto) => {
  const solicitarDados = new XMLHttpRequest();
  solicitarDados.onreadystatechange = () => {
    if (solicitarDados.readyState === 4 && solicitarDados.status === 200) {
      document.getElementById("resposta").value = solicitarDados.responseText;
      fazerRequisicao();
    }
  };

  const envio = JSON.stringify(novoProduto);

  solicitarDados.open(
    "PUT",
    "http://reserva.laboratorio.app.br:10100/produto/" + id,
    true
  );
  solicitarDados.setRequestHeader(
    "Content-Type",
    "application/json;charset=UTF-8"
  );
  solicitarDados.send(envio);
};

// Função para editar um item
const editarItem = (id) => {
  init.btnSalvar.style.display = "block";
  init.btnCancelar.style.display = "block";

  const camposEditar = {
    codBarras: document.getElementById(`codBarras_${id}`),
    produto: document.getElementById(`produto_${id}`),
    marca: document.getElementById(`marca_${id}`),
    modelo: document.getElementById(`modelo_${id}`),
    valor: document.getElementById(`valor_${id}`),
  };

  const valoresOriginais = {
    codBarras: camposEditar.codBarras.value,
    produto: camposEditar.produto.value,
    marca: camposEditar.marca.value,
    modelo: camposEditar.modelo.value,
    valor: camposEditar.valor.value,
  };

  bloquearDesbloquearCampos(camposEditar, false);

  init.btnSalvar.addEventListener("click", () => {
    const novosDadosProduto = {
      id: id,
      codBarras: camposEditar.codBarras.value,
      produto: camposEditar.produto.value,
      marca: camposEditar.marca.value,
      modelo: camposEditar.modelo.value,
      valor: camposEditar.valor.value,
    };

    if (!camposEstaoVazios(novosDadosProduto)) {
      enviarEdicao(id, novosDadosProduto);
      bloquearDesbloquearCampos(camposEditar, true);
      init.btnSalvar.style.display = "none";
      init.btnCancelar.style.display = "none";
    }
  });

  init.btnCancelar.addEventListener("click", () => {
    camposEditar.codBarras.value = valoresOriginais.codBarras;
    camposEditar.produto.value = valoresOriginais.produto;
    camposEditar.marca.value = valoresOriginais.marca;
    camposEditar.modelo.value = valoresOriginais.modelo;
    camposEditar.valor.value = valoresOriginais.valor;

    bloquearDesbloquearCampos(camposEditar, true);

    init.btnSalvar.style.display = "none";
    init.btnCancelar.style.display = "none";
  });
};

// Adicionando eventos aos botões
init.btnCadastrar.addEventListener("click", () => {
  cadastrar();
});

init.inputPesquisa.addEventListener("input", () => {
  const idPesquisa = inputPesquisa.value;
  idPesquisa !== "" ? fazerRequisicaoPorID(idPesquisa) : fazerRequisicao();
});

// Iniciando a primeira requisição
fazerRequisicao();
