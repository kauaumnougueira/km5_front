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

function createCliente(veio = null) {
    if (fileName !== "index.html") {
      window.location.href = "index.html?action=createCliente&veio="+veio;
    } else {
      mainDiv.innerHTML = " "; // Limpa
      import('./clientes.js').then(({ formCadastro }) => {
        formCadastro(mainDiv, token, veio);
      });
    }
  }
  

function relatorio(cliente = null){
    //acho que essa aqui funciona melhor com redirecionamento
    
    window.location.href= "relatorio.html?cliente="+cliente
}

window.createCliente = createCliente
window.viewClientes = viewClientes
window.relatorio = relatorio