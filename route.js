document.addEventListener("click", (e) => {
    e.preventDefault();
    route(e);
});

const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
}

const routes = {
    '/': '/src/view/login.html',
    '/index.html': '/src/view/login.html',
    '/home': '/src/view/home.html',
    '/medicamentos': '/src/view/medicamentos.html',
    '/beleza': '/src/view/beleza.html',
    '/dermocosmeticos': '/src/view/dermocosmeticos.html',
    '/higiene': '/src/view/higiene.html',
}

const root = document.getElementById('main-page');

const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path];
    const content = await fetch(route).then((data) => data.text());
    root.innerHTML = content;
}

window.onpopstate = handleLocation;
window.route = route;

handleLocation();

        
  


