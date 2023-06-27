import home from './view/home/index.js';
import medicamentos from './view/medicamentos/index.js';
import beleza from './view/beleza/index.js';
import dermocosmeticos from './view/dermocosmeticos/index.js';
import higiene from './view/higiene/index.js';
import login from './view/login/index.js';
import cadastrar from './view/cadastro/index.js';
import conteudo from './view/conteudo/index.js';
import tecnologia from './view/tecnologia/index.js';
import sobre from './view/sobre/index.js';
import conta from './view/conta/index.js';
import administracao from './view/administracao/index.js';

const main = document.querySelector("#root");

const init = () => {
    window.addEventListener("hashchange", () =>{
        let locationHash = window.location.hash;
        switch (locationHash) {
            case '':
                main.replaceChildren(home());
                break;
            case '#entrar':
                main.replaceChildren(login());
                    break;
            case '#conteudo':
                main.replaceChildren(conteudo());
                break;
            case '#tecnologia':
                main.replaceChildren(tecnologia());
                break;
            case '#sobre':
                main.replaceChildren(sobre());
                break;
            case '#medicamentos':
                main.replaceChildren(medicamentos());
                break;
            case '#dermocosmeticos':
                main.replaceChildren(dermocosmeticos());
                break;
            case '#beleza':
                main.replaceChildren(beleza());
                break;
            case '#higiene':
                main.replaceChildren(higiene());
                break;
            case '#cadastrar':
                main.replaceChildren(cadastrar());
                break;
            case '#conta':
                main.replaceChildren(conta());
                break;
            case '#administracao':
                main.replaceChildren(administracao());
                break;     
            default:
              console.log(`Sorry.`);
        }
    })
}

window.addEventListener('load', () =>{
    main.appendChild(home());
    window.location.hash = '#'
    init();
})

// main.addEventListener('change', () =>{
//     main.appendChild(home());
//     init();
// })


