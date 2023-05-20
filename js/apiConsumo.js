function getClientes(token){
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

export { getClientes }

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
            return 1
        })
        .catch(error => {
            console.error(error);
        });
    })
}

export { criarCliente }

function editarCliente(token, formData, id){
    fetch('http://127.0.0.1:8000/api/updatecliente/'+id, {
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
        return 1
    })
    .catch(error => {
        console.error(error);
    });
}

export { editarCliente }

function getCliente(token, id){
    return fetch('http://127.0.0.1:8000/api/getcliente/'+id,{
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

export { getCliente }