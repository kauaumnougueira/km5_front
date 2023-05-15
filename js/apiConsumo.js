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