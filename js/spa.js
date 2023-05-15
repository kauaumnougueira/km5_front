function render(div, component){
    //fetch de render
    fetch(component)
        .then(response => response.text())
        .then(html => {
            div.innerHTML = html
        })
        .catch(error => console.error(error));
}

