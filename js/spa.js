function render(div, component){
    //fetch de render
    fetch(component)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao carregar o componente: ${response.status}`);
            }
            return response.text()
        })
        .then(html => {
            div.innerHTML = html
            const scripts = div.querySelectorAll('script');
      
            scripts.forEach(script => {
                const newScript = document.createElement('script');
                newScript.textContent = script.textContent;
                document.body.appendChild(newScript);
            })})
        .catch(error => console.error(error));
}

