// Array que armazena os itens da lista
let items = [];

// Elementos principais
const itemInput = document.getElementById("itemInput");
const mensagem = document.getElementById("mensagem");
const listaCompras = document.getElementById("listaCompras");
const botaoBaixar = document.getElementById("baixar-lista");


// =========================
// ADICIONAR ITEM
// =========================
function addItem() {
  let item = itemInput.value.trim();

  // Valida se o campo está vazio
  if (item === "") {
    mensagem.textContent = "Por favor, preencha o campo do item!";
    mensagem.classList.remove("sucesso");
    mensagem.classList.add("erro");
  } else {
    mensagem.textContent = "Item adicionado com sucesso!";
    mensagem.classList.remove("erro");
    mensagem.classList.add("sucesso");

    // Adiciona item ao array
    items.push(item);

    // Atualiza lista na tela
    renderizarItems();
  }

  // Limpa o input
  itemInput.value = "";
}




// =========================
// RENDERIZAR ITENS NA TELA
// =========================
function renderizarItems() {
  // Limpa a lista antes de renderizar novamente
  listaCompras.innerHTML = "";

  // Percorre o array e cria cada item da lista
  for (let i = 0; i < items.length; i++) {
    const itemLista = document.createElement("li");

    const textoItem = document.createElement("span");
    textoItem.textContent = items[i];

    // Botão remover
    const botaoRemover = document.createElement("button");
    botaoRemover.classList.add("botao-remover");
    botaoRemover.textContent = "Remover";
    botaoRemover.onclick = () => removerItem(i);

    // Botão editar
    const botaoEditar = document.createElement("button");
    botaoEditar.classList.add("botao-editar");
    botaoEditar.textContent = "Editar";
    botaoEditar.onclick = () => editarItem(i);

    // Div para organizar os botões no CSS
    const botoes = document.createElement("div");
    botoes.classList.add("botoes-items");

    botoes.appendChild(botaoEditar);
    botoes.appendChild(botaoRemover);

    itemLista.appendChild(textoItem);
    itemLista.appendChild(botoes);

    listaCompras.appendChild(itemLista);
  }
}


// =========================
// REMOVER ITEM
// =========================
function removerItem(i) {
  items.splice(i, 1);
  renderizarItems();
}


// =========================
// EDITAR ITEM
// =========================
function editarItem(i) {
  let novoItem = prompt("Digite o novo item:");

  // Verifica se o usuário clicou em cancelar
  if (novoItem === null) {
    return;
  }

  // Remove espaços extras
  novoItem = novoItem.trim();

  // Valida se o campo não está vazio
  if (novoItem !== "") {
    items[i] = novoItem;
    renderizarItems();
  }
}


// =========================
// LIMPAR TODOS OS ITENS
// =========================
function limparTudo() {
  items = [];
  renderizarItems();

  mensagem.textContent = "Todos os itens foram removidos com sucesso!";
  mensagem.classList.remove("erro");
  mensagem.classList.add("sucesso");
}


// =========================
// BAIXAR LISTA
// =========================
function baixarLista() {
  // Verifica se a lista está vazia
  if (items.length === 0) {
    mensagem.textContent = "A lista está vazia. Adicione itens antes de baixar.";
    mensagem.classList.remove("sucesso");
    mensagem.classList.add("erro");
    return;
  }

  // Transforma o array em texto
  let lista = items.map(item => "- " + item).join("\n");

  // Cria o arquivo
  let arquivo = new Blob([lista], { type: "text/plain" });

  // Cria link temporário para download
  let link = document.createElement("a");
  link.href = URL.createObjectURL(arquivo);
  link.download = "lista-de-compras.txt";
  link.click();
}


// =========================
// EVENTO DO BOTÃO BAIXAR
// =========================
if (botaoBaixar) {
  botaoBaixar.addEventListener("click", baixarLista);
}