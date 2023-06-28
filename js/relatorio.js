import { criarClienteServico, get } from './apiConsumo.js'

window.onload = servicos()
function servicos(){
    const servicosAdd = document.querySelector('#servicosAdd')
    const select = document.querySelector('#servicos');
    let rota = 'getservicos'
    get(token, rota).then(data => {
        data.forEach(e => {
            let option = document.createElement('option')
            option.setAttribute('value', e.id)
            option.textContent = e.nome
            select.appendChild(option)
        })
    })
    select.addEventListener('change', () => {
        const selectedOption = select.selectedOptions[0];
        const selectedClientId = selectedOption.getAttribute('value');
        let servico = document.createElement('p')
        let btn = document.createElement('button')
        btn.classList.add('btn', 'btn-outline-secondary', 'px-2')
        btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16"> <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/> </svg>'
        btn.addEventListener('click', () => {
            servicosAdd.removeChild(servico)
        })

        servico.classList.add('input-group-text', 'col-3', 'justify-content-between')
        servico.textContent += selectedOption.textContent
        servico.appendChild(btn)
        servicosAdd.appendChild(servico)
    })
}

window.onload = clientes()
function clientes(){
    const urlParams = new URLSearchParams(window.location.search);
    const clienteId = urlParams.get('cliente');

    const select = document.querySelector('#clientes');
    const telefone = document.querySelector('#telefone')
    const endereco = document.querySelector('#endereco')

    if(clienteId !== null){
        let rota = 'getcliente/'+clienteId
        get(token, rota).then(cliente => {
            let option = document.createElement('option');
            option.setAttribute('value', cliente.id)
            option.textContent = cliente.nome
            select.appendChild(option)
            telefone.textContent = cliente.telefone
            endereco.textContent = cliente.endereco
        })
    }
    let rota = 'getclientes';
    get(token, rota).then(data => {
        data.forEach(e => {
                let option = document.createElement('option');
                option.setAttribute('value', e.id)
                option.textContent = e.nome
                select.appendChild(option)
                select.addEventListener('change', () => {
                    const selectedOption = select.selectedOptions[0];
                    const selectedClientId = selectedOption.getAttribute('value');
                    rota = 'getcliente/'+selectedClientId
                    get(token, rota).then(cliente => {
                        telefone.textContent = cliente.telefone
                        endereco.textContent = cliente.endereco
                    })
                  });
        })
    })
}

function salvar(){
    //pegar todos os atributos de id e salvar no cliente em questã
    const select = document.querySelector('#clientes')
    const clienteId = select.getAttribute('value')

    const tipoServico = document.querySelector('montagem-body')
    if(tipoServico.children !== null ){
        tipoServico.children.forEach(data => {
            let tsid = data.getAttribute('idTipoServ')
            if(!isNaN(tsid)){
                let salvar = '/createclienteservico/' + clienteId + '/' + tsId
                criarClienteServico(token, salvar)
            }
        })
    }
    

}

window.salvar = salvar 
