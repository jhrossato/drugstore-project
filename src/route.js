import home from './view/home/index.js';
import login from './view/login/index.js';
import conteudo from './view/conteudo/index.js';
import tecnologia from './view/tecnologia/index.js';
import sobre from './view/sobre/index.js';

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
            default:
              console.log(`Sorry.`);
        }
    })
}

window.addEventListener('load', () =>{
    main.appendChild(home());
    init();
})

// const route = (event) => {
//     event = event || window.event;
//     event.preventDefault();
//     window.history.pushState({}, "", event.target.href);
    
//     handleLocation();
// }

// const routes = {
//     '/#login': login(),
//     '/index.html': '/src/view/login.html',
//     '/home': '/src/view/home.html',
//     '/medicamentos': '/src/view/medicamentos.html',
//     '/beleza': '/src/view/beleza.html',
//     '/dermocosmeticos': '/src/view/dermocosmeticos.html',
//     '/higiene': '/src/view/higiene.html',
//     '/conteudo': '/src/view/conteudo.html',
//     '/tecnologia': '/src/view/tecnologia.html',
//     '/sobre': '/src/view/sobre.html',
// }

// const root = document.getElementById('main-page');

// const handleLocation = async () => {
//     const path = window.location.pathname;
//     const route = routes[path];
//     const content = await fetch(route).then((data) => data.text());
//     root.innerHTML = content;
//     console.log(window.location.href)
//     console.log(window.location.pathname)
//     console.log(window.route)
// }

// window.onpopstate = handleLocation();
// window.route = route();

// handleLocation();

// window.onhashchange = route;


  


