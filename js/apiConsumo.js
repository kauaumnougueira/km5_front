function get(token){
    return fetch('http://127.0.0.1:8000/api/getclientes',{
        method: 'GET',
        headers: {
            'X-CSRF-TOKEN': token
        },
        mode: 'cors'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        return data
    })
    .catch(error => {
        console.error(error);
    });
}

export { get }

function criarCliente(token, form){
    form.addEventListener('submit', (event) =>{
        event.preventDefault();

        const formData = new FormData(form)

        fetch('http://127.0.0.1:8000/api/createcliente', {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRF-TOKEN': token
            },
            mode: 'cors'
        })
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            window.alert("cliente atualizado com sucesso!")
            window.location.href = "http://127.0.0.1:5500/index.html/clientes"
        })
        .catch(error => {
            console.error(error);
        });
    })
}

export { criarCliente }