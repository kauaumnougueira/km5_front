import { criarClienteServico, get } from './apiConsumo.js'

window.onload = servicos()
function servicos(){
    const servicosAdd = document.querySelector('#servicosAdd')
    const select = document.querySelector('#servicos')
    const vazio = document.createElement('option')
    vazio.textContent = 'Selecione uma opção';
    select.appendChild(vazio)
    
    let rota = 'getservicos'
    get(token, rota).then(data => {
        data.forEach(e => {
            let option = document.createElement('option')
            option.setAttribute('value', e.id)
            option.textContent = e.nome
            select.appendChild(option)
        })
        let outro = document.createElement('option')
        outro.setAttribute('value', 'outro')
        outro.textContent = 'outro'
        select.appendChild(outro)
    })
    

    let servicosCounter = 0;
    let row
    select.addEventListener('change', () => {
        vazio.setAttribute('disabled', 'true')

        //
        const divServ = document.createElement('div')
        divServ.classList.add('row', 'col-6', 'justify-content-between')
        const divPreco = document.createElement('div')

        //ATRIBUINDO NOME DE SERVIÇO E BOTÃO DE EXCLUIR
        const selectedOption = select.selectedOptions[0];
        const selectedServId = selectedOption.getAttribute('value');
        let servico = document.createElement('div')
        const selectTS = document.createElement('select')
        
        if(selectedServId ===  'outro'){
            const input = document.createElement('input')
            input.classList.add('form-control')
            input.setAttribute('placeholder', 'outro')
            input.setAttribute('required', 'true')
            divServ.appendChild(input)
            divPreco.classList.add('input-group', 'col-7', 'mb-2')
            divPreco.innerHTML = '<div class="input-group-prepend"> <span class="input-group-text">Preço</span> </div> <input name="" id="'+selectedServId+'" class="form-control preco h-100" value="'+0+'"></input>'
            mascara()
        }else{
            //select TipoServico select de tiposervico em cada servico kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
            
            selectTS.classList.add('form-control')
            vazio.removeAttribute('disabled')
            selectTS.appendChild(vazio)
            divServ.appendChild(selectTS)
        }

        //para api
        if(selectedServId !== 'outro'){
            rota = 'gettiposervicos/'+selectedServId

            get(token, rota).then(data => {
                data.forEach(e => {
                    let option = document.createElement('option')
                    option.setAttribute('value', e.id)
                    option.setAttribute('price', e.preco)
                    option.textContent = selectedOption.textContent + ' ' + e.nome
                    selectTS.appendChild(option)
                })
            })
        }


        selectTS.addEventListener('change', () => {
            vazio.setAttribute('disabled', 'true');
            const selectedOptionTS = selectTS.selectedOptions[0];
            const selectedServPrice = selectedOptionTS.getAttribute('price');
            //INPUT DE PREÇO
            divPreco.classList.add('input-group', 'col-7', 'mb-2')
            divPreco.innerHTML = '<div class="input-group-prepend"> <span class="input-group-text">Preço</span> </div> <input name="" id="'+selectedServId+'" class="form-control preco h-100"value="'+ selectedServPrice*100 +'"></input>'
            mascara()
        })

        let btn = document.createElement('button')
        btn.classList.add('btn', 'btn-sm', 'btn-outline-secondary', 'border-0')
        btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16"> <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/> </svg>'
        btn.addEventListener('click', () => {
            row.removeChild(divServ)
        })

        servico.classList.add('input-group-text', 'col-5', 'justify-content-between', 'mb-5', 'h-50', 'p-1', 'px-2', 'pl-1')
        servico.innerHTML = selectedOption.textContent
        //servico.textContent += 
        servico.appendChild(btn)
        
        divServ.appendChild(divPreco)

        if (servicosCounter % 2 === 0) { // Ajustado para % 2
            row = document.createElement('div');
            row.classList.add('row', 'px-3', 'justify-content-center');
            servicosAdd.appendChild(row);
        }
    
    
        row.appendChild(divServ);
        servicosCounter++;
    })
}

window.onload = clientes()
function clientes(){
    const urlParams = new URLSearchParams(window.location.search);
    const clienteId = urlParams.get('cliente');

    const select = document.querySelector('#clientes');
    const telefone = document.querySelector('#telefone')
    const endereco = document.querySelector('#endereco')

    if(clienteId !== 'null' && clienteId !== null){
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
                select.addEventListener('click', () => {
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
    history.replaceState({}, document.title, "relatorio.html");
}

function salvar(){
    //id de relatório relacionado ao cliente servico pra saber quando foi feito, por exemplo
    //criar registros de cliente-servico
    //criar registro de relatorio com id de cliente servico
    //cliente
    //descrição cliente
    //servicos-tiposervicos
    //outros

}

window.salvar = salvar 

function mascara(){
    //mascara
    $(document).ready(function() {
        $('.preco').inputmask({
            alias: 'numeric',
            radixPoint: ',',
            groupSeparator: '.',
            autoGroup: true,
            digits: 2,
            numericInput: true,
            placeholder: '0',
            rightAlign: false,
            onBeforeMask: function (value) {
                return value.replace('.', '');
            }
        });
    });
}
