export default () => {
    const container = document.createElement('div');
    
    const handleTemplate = async () => {
        const template =  await fetch('/view/login/index.html').then((data) => data.text());
        container.innerHTML = template;

        const email = document.getElementById('input-email');
        const senha = document.getElementById('input-senha');

        const spinner = document.getElementById('spinner');
        
        document.getElementById('btn-submit').addEventListener('click', function(e){
            e.preventDefault();
            this.classList.add("d-none");
            spinner.classList.remove("d-none")
            fetch('http://localhost:3000/login', {
                method: 'POST',
                body:JSON.stringify({
                    email:email.value,
                    senha:senha.value
                }),
                headers:{
                    "Content-Type":"application/json; charset=UTF-8"
                }
            })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                if(json.err){
                    this.classList.remove("d-none");
                    spinner.classList.add("d-none");
                    document.getElementById('error').innerHTML = json.err;
                }
                else{
                    this.classList.remove("d-none");
                    spinner.classList.add("d-none");
                    document.cookie = "token="+ json.token;
                    document.cookie = "nome="+ json.nome.split(' ')[0];
                    document.cookie = "userId="+ json.userId;
                    sessionStorage.setItem("userId", json.userId);
                    sessionStorage.setItem("adm", json.adm);
                    location.reload();
                }
            })
        })
    }
    
    handleTemplate();

    return container;
}