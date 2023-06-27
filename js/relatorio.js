import { criarClienteServico, get } from './apiConsumo.js'

window.onload = clientes()
function clientes(){
    const select = document.querySelector('#clientes');
    let rota = 'getclientes';
    get(token, rota).then(data => {
        data.forEach(e => {
            const option = document.createElement('option');
            option.setAttribute('value', e.id)
            option.textContent = e.nome
            select.appendChild(option)
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
