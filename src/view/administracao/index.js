export default () => {
    const container = document.createElement('div');
    
    const handleTemplate = async () => {
        const template =  await fetch('/view/administracao/index.html').then((data) => data.text());
        container.innerHTML = template;

        const nome = document.getElementById('input-nome') == null ? '' : document.getElementById('input-nome');
        const email = document.getElementById('input-email') == null ? '' : document.getElementById('input-email');
        const senha = document.getElementById('input-senha') == null ? '' : document.getElementById('input-senha');
        const cpf = document.getElementById('input-cpf') == null ? '' : document.getElementById('input-cpf');

        const spinner = document.getElementById('spinner');
        
        document.getElementById('btn-submit').addEventListener('click', function(e){
            e.preventDefault();
            this.classList.add("d-none");
            spinner.classList.remove("d-none")
            fetch('http://localhost:3000/produtos/new', {
            method: 'POST',
            body:JSON.stringify({
                nome:nome.value,
                email:email.value,
                senha:senha.value,
                cpf:cpf.value,
                adm:"0"
            }),
            headers:{
                "Content-Type":"application/json; charset=UTF-8"
            }
            })
            .then(response => response.json())
            .then(json => {
                if(json.err){
                    document.getElementById('error').innerHTML = json.err[0];
                }
                this.classList.remove("d-none");
                spinner.classList.add("d-none");
                location.reload();
            })
        })
    }
    
    handleTemplate();

    return container;
}