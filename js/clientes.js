import { get } from './apiConsumo.js'
import { criarCliente } from './apiConsumo.js'

function pesquisa(div){
    if(document.querySelector('#pesquisa') === null){
        //colocar a estrutura abaixo na div
        const container = document.createElement('div')
        container.classList.add('input-group', 'justify-content-md-center')

        const divinp = document.createElement('div')
        divinp.classList.add('row', 'w-50')
        const input = document.createElement('input')
            input.classList.add('form-control', 'col-8', 'mr-4')
            input.setAttribute('id', 'pesquisa')

            const button = document.createElement('button')
            button.classList.add('btn', 'btn-info', 'col-3')
            button.setAttribute('id', 'pesquisaBtn')
            button.textContent = 'Pesquisar'

            divinp.appendChild(input)
            divinp.appendChild(button)

        container.appendChild(divinp)

        div.appendChild(container)
        return button
    }
    let button = document.querySelector('#pesquisaBtn')
    if(button !== null)
        return button
}

function criarTabela(div, token, pesquisaInp = null){
    let container = document.querySelector('#div-table')
    if(container === null){
        container = document.createElement('div')
        container.setAttribute('id', 'div-table')
        container.classList.add('container', 'shadow-lg', 'bg-light', 'pt-2');
    }
    
    const pesquisaBtn = pesquisa(container)
    
    //const titulo = document.createElement('div')
    //titulo.textContent = "CLIENTES"
    //container.appendChild(titulo)

    const row = document.createElement('div')
    row.classList.add('row', 'justify-content-center')
    pesquisaBtn.addEventListener('click', () => {
        container.removeChild(row)
        const input = document.querySelector('#pesquisa')
        criarTabela(div, token, input.value)
    })

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
    const rota = 'getclientes'
    get(token, rota).then(data => {
        data.forEach(e => {
            if(pesquisaInp === null){
                pesquisaInp = ""
            }
            if(e.nome.includes(pesquisaInp)){
                const linha = document.createElement('tr')
                linha.setAttribute('style', 'cursor: pointer; user-select: none')
                linha.setAttribute('scope', 'row')
                linha.addEventListener('click', (event) =>{
                    event.preventDefault()
                    document.cookie = "id=" + e.id + "; path=/";
                    div.innerHTML = " "
                    //render(div, '../perfil.html', 'js/perfil.js')
                    //nao renderiza mais, mas muda de pagina
                    location.href = "perfil.html"
                })
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
            }
        })
    })

    table.appendChild(tbody)
    col.appendChild(table)
    row.appendChild(col)
    container.appendChild(row)
    div.appendChild(container);
}

export { criarTabela }

function formCadastro(div, token, veio = null){
    const container = document.createElement('div');
    container.classList.add('container', 'shadow-lg', 'bg-light', 'p-5');

    const h1 = document.createElement('h1')
    h1.innerHTML = "Cadastro de Clientes"
    container.appendChild(h1)

    const form = document.createElement('form');
    form.setAttribute('id', 'form')

    const form_group1 = document.createElement('div');
    form_group1.classList.add('form-group');

    const label1 = document.createElement('label');
    label1.innerHTML = "nome";

    const input1 = document.createElement('input');
    input1.classList.add('form-control');
    input1.setAttribute('placeholder', 'nome');
    input1.setAttribute('name', 'nome')

    form_group1.appendChild(label1);
    form_group1.appendChild(input1);

    const form_group2 = document.createElement('div');
    form_group2.classList.add('form-group');

    const label2 = document.createElement('label');
    label2.innerHTML = "telefone";

    const input2 = document.createElement('input');
    input2.classList.add('form-control');
    input2.setAttribute('name', 'telefone')
    input2.setAttribute('placeholder', '(00) 0 0000-0000');
    $(input2).mask("(00) 0 0000-0000");

    form_group2.appendChild(label2);
    form_group2.appendChild(input2);

    const form_group3 = document.createElement('div');
    form_group3.classList.add('form-group');

    const label3 = document.createElement('label');
    label3.innerHTML = "endereço";

    const input3 = document.createElement('input');
    input3.classList.add('form-control');
    input3.setAttribute('placeholder', 'rua x quadra y casa z');
    input3.setAttribute('name', 'endereco')

    form_group3.appendChild(label3);
    form_group3.appendChild(input3);

    const form_group4 = document.createElement('div');
    form_group4.classList.add('form-group');

    const label4 = document.createElement('label');
    label4.innerHTML = "cliente desde";

    const input4 = document.createElement('input');
    input4.classList.add('form-control');
    input4.setAttribute('placeholder', 'DD/MM/AAAA');
    input4.setAttribute('name', 'desde')
    $(input4).mask("00/00/0000");

    form_group4.appendChild(label4);
    form_group4.appendChild(input4);

    const button = document.createElement('button');
    button.setAttribute('type', 'submit');
    button.setAttribute('id', 'enviar');
    button.classList.add('btn', 'btn-primary', 'mx-auto', 'd-block');
    button.innerHTML = "Enviar"

    form.appendChild(form_group1);
    form.appendChild(form_group2);
    form.appendChild(form_group3);
    form.appendChild(form_group4);
    form.appendChild(button);

    container.appendChild(form);
    console.log(veio)
    div.appendChild(container)
    criarCliente(token, form).then(data => {
        if(veio === 'relatorio'){
            relatorio(data.id_cliente)
        }
        if(data !== null){
            div.innerHTML = " "
            criarTabela(div, token)
        }
    })
}

export { formCadastro }