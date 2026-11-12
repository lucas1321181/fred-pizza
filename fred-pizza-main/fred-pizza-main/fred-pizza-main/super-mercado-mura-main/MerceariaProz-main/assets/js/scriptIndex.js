console.log("JavaScript carregado!")

// Pegar produtos do localStorage
const produtosLocalStorage = JSON.parse(
    localStorage.getItem("Produtos")
) || []

console.log("Produtos encontrados:", produtosLocalStorage)

// Encontrar elemento HTML

const listaProdutos = document.getElementById("lista-produtos")

console.log("Elemento encontrado:", listaProdutos)

// Mostrar produtos

function escreverNatela(produtosLocalStorage) {
    listaProdutos.innerHTML = produtosLocalStorage.map((produto) => `
        <article>

            <h3>${produto.nome}</h3>

            <p>Preço: R$ ${produto.preco}</p>

            <p>Categoria: ${produto.categoria}</p>

        </article>

    `).join("")
}
escreverNatela(produtosLocalStorage)
// passo 1 pegar o select do html
const filtroCategoria = document.getElementById("filtroCategoria")
// passo 2 pegar as categorias e transforma-las em unicas
const categorias = produtosLocalStorage.map((produtos) => produtos.categoria)
const categoriasUnicas = [...new Set(categorias)]

// passo 3 escrever as categorias na tela
filtroCategoria.innerHTML += categoriasUnicas.map(categoria => `
    <option>${categoria}</option>
`).join("")


filtroCategoria.addEventListener("change", () => {
 const categoriaSelecionada = filtroCategoria.value
 let produtosFiltrados = []

    if (categoriaSelecionada == "Todas") {
        produtosFiltrados = produtosLocalStorage
    } else {   
        produtosFiltrados = produtosLocalStorage.filter((produto) => 
            produto.categoria == categoriaSelecionada
        )
    }

    escreverNatela(produtosFiltrados)
})

// Ordenação dos produtos por preço

const ordenarPreco = document.getElementById("ordenarPreco")

ordenarPreco.addEventListener("change", () => {

    const ordemSelecionada = ordenarPreco.value
    let produtosOrdenados = [...produtosLocalStorage]

    // Aplicar filtro de categoria
    const categoriaSelecionada = filtroCategoria.value

    if (categoriaSelecionada != "Todas") {
        produtosOrdenados = produtosOrdenados.filter((produto) =>
            produto.categoria == categoriaSelecionada
        )
    }

    // Ordenar por preço
    if (ordemSelecionada == "menor") {
        produtosOrdenados.sort((a, b) => a.preco - b.preco)

    } else if (ordemSelecionada == "maior") {
        produtosOrdenados.sort((a, b) => b.preco - a.preco)
    }

    escreverNatela(produtosOrdenados)
})

// Atualizar ordenação quando mudar a categoria
filtroCategoria.addEventListener("change", () => {
    ordenarPreco.dispatchEvent(new Event("change"))
})