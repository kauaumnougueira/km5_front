import { get } from './apiConsumo.js'

function criarTabela(div, token){
    const container = document.createElement('div')
    container.classList.add('container', 'shadow-lg');
    
    const titulo = document.createElement('div')
    titulo.textContent = "CLIENTES"
    container.appendChild(titulo)

    const row = document.createElement('div')
    row.classList.add('row', 'justify-content-center')
    

    const col = document.createElement('div')
    col.classList.add('col-md-12', 'mt-2')
    
    const table = document.createElement('table')
    table.classList.add('w-100', 'table', 'table-hover')

    const thead = document.createElement('thead')
    
    const tr = document.createElement('tr')
    const thNome = document.createElement('th')
    thNome.setAttribute('scope', 'col')
    thNome.classList.add('col-md-3')
    thNome.textContent = "Nome"
    const thTelefone = document.createElement('th')
    thTelefone.setAttribute('scope', 'col')
    thTelefone.classList.add('col-md-4')
    thTelefone.textContent = "Telefone"
    const thEndereco = document.createElement('th')
    thEndereco.setAttribute('scope', 'col')
    thEndereco.classList.add('col-md-5')
    thEndereco.textContent = "Endereço"
    tr.appendChild(thNome)
    tr.appendChild(thTelefone)
    tr.appendChild(thEndereco)
    thead.appendChild(tr)
    table.appendChild(thead)

    const tbody = document.createElement('tbody')
    
    get(token).then(data => {
        data.forEach(e => {
            const linha = document.createElement('tr')
            linha.setAttribute('scope', 'row')
            const tdNome = document.createElement('td')
            const tdTelefone = document.createElement('td')
            const tdEndereco = document.createElement('td')
            tdNome.textContent = e.nome
            tdTelefone.textContent = e.telefone
            tdEndereco.textContent = e.endereco
            linha.appendChild(tdNome)
            linha.appendChild(tdTelefone)
            linha.appendChild(tdEndereco)
            tbody.appendChild(linha)
        })
    })

    table.appendChild(tbody)
    col.appendChild(table)
    row.appendChild(col)
    container.appendChild(row)
    div.appendChild(container);
}

export { criarTabela }

function alimentarTabela(){

}