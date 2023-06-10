const mainDiv = document.getElementById('main')
const token = document.head.querySelector('meta[name="csrf-token"]').getAttribute('content');

const filePath = window.location.pathname;
const fileName = filePath.substring(filePath.lastIndexOf('/') + 1);

//renderizando main
function viewClientes(){
    
    if(fileName !== "index.html"){
        window.location.href = "index.html?action=viewCliente"
    }else{
        mainDiv.innerHTML = " " //limpa
        import('./clientes.js').then(({ criarTabela }) => {
            criarTabela(mainDiv, token)
        })
    }
    
}

function createCliente(){
    if(fileName !== "index.html"){
        window.location.href = "index.html?action=createCliente"
    }else{
        mainDiv.innerHTML = " " //limpa
        import('./clientes.js').then(({ formCadastro }) => {
            formCadastro(mainDiv, token)
        })
    }
}

function servicos(){
    //acho que essa aqui funciona melhor com redirecionamento
    
    mainDiv.innerHTML = " " //limpa
    const servicos = 'servicos.html'
    render(mainDiv, servicos)
}

window.createCliente = createCliente
window.viewClientes = viewClientes
window.servicos = servicos