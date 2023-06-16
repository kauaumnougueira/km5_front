import { get } from './apiConsumo.js'

window.onload = alimentacao()
function alimentacao() {
    let rota = 'getservicos';
    get(token, rota).then(servico => {
      const servicos = document.getElementById('servicos-ul');
      servicos.innerHTML = ''; // Limpa os itens anteriores
  
      servico.forEach(e => {
        const li = document.createElement('li');
        li.setAttribute('id', 'accordion-' + e.nome);
        li.classList.add('row', 'accordion', 'shadow', 'bg-info', 'pt-3', 'rounded', 'div-saltar', 'm-2');
  
        const divAdcionar = document.createElement('button')
        divAdcionar.classList.add('col-2', 'btn', 'btn-success')
        divAdcionar.textContent = "Add"
        
        const div = document.createElement('div');
        div.classList.add('col-10','accordion-item', 'bg-info');
        

        const divButton = document.createElement('button');
        divButton.classList.add('accordion-button', 'collapsed');
        divButton.setAttribute('data-bs-toggle', 'collapse');
        divButton.setAttribute('data-bs-target', '#abrir-' + e.nome);
        divButton.setAttribute('style', 'border: none; background-color: transparent; outline: none; width: 100%');
  
        const p = document.createElement('p');
        p.textContent = e.nome.toUpperCase();
        p.classList.add('text-light', 'font-weight-bold');
  
        const accordionBody = document.createElement('div');
        accordionBody.classList.add('accordion-collapse', 'collapse', 'text-light', 'font-weight-bold');
        accordionBody.setAttribute('id', 'abrir-' + e.nome);
  
        const accordionTipos = document.createElement('div');
        accordionTipos.classList.add('accordion-body');
        accordionTipos.setAttribute('style', 'cursor: pointer');
        accordionTipos.setAttribute('style', 'cursor: pointer');
  
        const pTSDef = document.createElement('p')
  
        //accordion
        rota = 'gettiposervico/' + e.id;
        get(token, rota).then(tipoServico => {
          tipoServico.forEach(ts => {
            const pTS = document.createElement( 'p');
            pTS.textContent = ts.nome.toUpperCase() + ' - R$' + ts.preco;
            pTS.classList.add('text-center', 'border', 'bg-light', 'rounded', 'text-dark', 'mx-2');
            pTS.addEventListener('click', () => {
              p.textContent = e.nome.toUpperCase() + ' ' + ts.nome.toUpperCase() + ' - R$' + ts.preco;
              divButton.classList.remove('show');
              const collapse = document.querySelector('#abrir-' + e.nome);
              collapse.classList.remove('show');
            });
            accordionTipos.appendChild(pTS);
          });
        });
  
        accordionBody.appendChild(accordionTipos);
  
        divAdcionar.addEventListener('click', () =>{
            const montagem = document.querySelector('#montagem-body')
            const liEscolhida = li
            const divRemover = document.createElement('button')
            divRemover.classList.add('col-2', 'btn', 'btn-danger')
            divRemover.textContent = "Rem"
            divRemover.addEventListener('click', () =>{
                li.removeChild(divRemover)
                li.appendChild(divAdcionar)
                divButton.removeAttribute('disabled')
                servicos.appendChild(li)
            })
            liEscolhida.removeChild(divAdcionar)
            liEscolhida.appendChild(divRemover)
            divButton.setAttribute('disabled', 'true')
            montagem.appendChild(liEscolhida)
        })

        // Adiciona o acordeão
        divButton.appendChild(p);
        divButton.appendChild(pTSDef);
        div.appendChild(divButton);
        div.appendChild(accordionBody);
        li.appendChild(div);
        li.appendChild(divAdcionar);
        servicos.appendChild(li);
      });
  
      // Atualiza os eventos dos acordeões após a criação dos elementos
      const accordionButtons = document.querySelectorAll('.accordion-button');
      accordionButtons.forEach(button => {
        button.addEventListener('click', function () {
          const target = this.getAttribute('data-bs-target');
          const collapse = document.querySelector(target);
          const isExpanded = collapse.classList.contains('show');
  
          if (isExpanded) {
            collapse.classList.remove('show');
          } else {
            collapse.classList.add('show');
          }
        });
      });
    });
  }
  