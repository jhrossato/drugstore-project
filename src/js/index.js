const menu = document.querySelector('.menu-dinamico');
const div = document.createElement('div');
menu.appendChild(div); 

window.addEventListener("hashchange", (e) => {
    e.preventDefault();
    getMenuConfig();
})

window.addEventListener('load', (e) => {
    e.preventDefault();
    getMenuConfig();
})

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  function deleteCookie() {
    document.cookie = `token=; expires=${Date.now}`
    document.cookie = `nome=; expires=${Date.now}`
    document.cookie = `userId=; expires=${Date.now}`
    location.reload();
  }


function getMenuConfig(){
    const token = getCookie('token');
    if(token){
      fetch('http://localhost:3000/login', {
        method: 'GET',
        headers:{
            "Content-Type":"application/json; charset=UTF-8",
            "x-access-token":getCookie('token')
        }
      })
      .then(response => response.json())
      .then(json => {
          if(json.auth === true){
            div.innerHTML = 
                `<div class="dropdown">
                <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                </a>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <li><a id="btn-administracao" class="d-none dropdown-item" href="#administracao">Administração</a></li>
                  <li><a class="dropdown-item" href="#conta">Minha conta</a></li>
                  <li><a id="btn-logout" class="dropdown-item" href="#">Logout</a></li>
                </ul>
                </div>`;
               
            document.getElementById('btn-logout').addEventListener('click', () => {
              deleteCookie();
            })
            document.getElementById('dropdownMenuLink').innerHTML = `Olá, ${getCookie('nome')}`;
            if(sessionStorage.getItem("adm") === 'true'){
              document.getElementById('btn-administracao').classList.remove('d-none');
            }
          }
          else{
              div.innerHTML = 
              `<div class="entrar-cadastrar">
                  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                      <li class="nav-item">
                          <a class="nav-link active" href="#cadastrar">Cadastre-se</a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link active" href="#entrar">Entrar</a>
                      </li>
                  </ul>
              </div>`;
          }
      })
    }
    else{
      div.innerHTML = 
      `<div class="entrar-cadastrar">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                  <a class="nav-link active" href="#cadastrar">Cadastre-se</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link active" href="#entrar">Entrar</a>
              </li>
          </ul>
      </div>`;
    }
  }

