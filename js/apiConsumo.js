function get(token, rota){
    return fetch('http://127.0.0.1:8000/api/'+rota,{
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

function criarCliente(token, form) {
    return new Promise((resolve, reject) => {
      const handleFormSubmit = (event) => {
        event.preventDefault();
  
        const formData = new FormData(form);
  
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
            window.alert("cliente atualizado com sucesso!");
            resolve(1);
          })
          .catch(error => {
            console.error(error);
            reject(error);
          });
      };
  
      form.addEventListener('submit', handleFormSubmit);
    });
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

function criarClienteServico(token, rota){
	fetch('http://127.0.0.1:8000/api/updatecliente/'+rota,{
		method: 'POST',
		headers: {
			'X-CSRF-TOKEN': token
		},
		mode: 'cors'
	})
	.then(response => response.json())
    .then(data => {
        //console.log(data);
        window.alert("cliente-servico atualizado com sucesso!")
        return 1
    })
    .catch(error => {
        console.error(error);
    });
}

export { criarClienteServico }