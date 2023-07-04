export default () => {
    const container = document.createElement('div');
    container.classList.add('d-none');
    
    const handleTemplate = async () => {
        const template =  await fetch('/view/conta/index.html').then((data) => data.text());
        container.innerHTML = template;

        let nome = document.getElementById('input-nome');
        let email = document.getElementById('input-email');
        let senha = document.getElementById('input-senha');
        let cpf = document.getElementById('input-cpf');
    
        const id = sessionStorage.getItem("userId");
        fetch(`http://localhost:3000/users/${id}`, {
        method: 'GET',
        headers:{
            "Content-Type":"application/json; charset=UTF-8",
            "x-access-token":getCookie('token')
        }
        })
        .then(response => response.json())
        .then(json => {
            nome.value  = json.nome;
            email.value  = json.email;
            senha.value  = json.senha;
            cpf.value  = json.cpf;
            container.classList.remove('d-none');
        })


        document.getElementById('btn-submit-alterar').addEventListener('click', function(e){
            e.preventDefault();
            const btn = document.querySelectorAll('.btn-submit');
            console.log(btn)
            btn.forEach(element => {
                element.classList.add("d-none");
            });
            spinner.classList.remove("d-none")
            fetch(`http://localhost:3000/users/update/${id}`, {
            method: 'PUT',
            body:JSON.stringify({
                nome:nome.value,
                email:email.value,
                senha:senha.value,
                cpf:cpf.value,
                adm:"0"
            }),
            headers:{
                "Content-Type":"application/json; charset=UTF-8",
                "x-access-token":getCookie('token')
            }
            })
            .then(response => response.json())
            .then(json => {
                if(json.err){
                    console.log(json);
                    document.getElementById('error').innerHTML = json.err[0];
                }
                btn.forEach(element => {
                    element.classList.remove("d-none");
                });
                spinner.classList.add("d-none");
                location.reload();
            })
        })

        document.getElementById('btn-submit-excluir').addEventListener('click', function(e){
            e.preventDefault();
            const btn = document.querySelectorAll('.btn-submit');
            console.log(btn)
            btn.forEach(element => {
                element.classList.add("d-none");
            });
            spinner.classList.remove("d-none")
            fetch(`http://localhost:3000/users/${id}`, {
            method: 'DELETE',
            headers:{
                "Content-Type":"application/json; charset=UTF-8",
                "x-access-token":getCookie('token')
            }
            })
            .then(response => {
                btn.forEach(element => {
                    element.classList.remove("d-none");
                });
                spinner.classList.add("d-none");
                deleteCookie()
                location.reload();
            })
        })
    }
    
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
      }

      function deleteCookie() {
        document.cookie = `token=; expires=${Date.now}`
        document.cookie = `nome=; expires=${Date.now}`
        document.cookie = `userId=; expires=${Date.now}`
      }

    handleTemplate();

    return container;
}