export default () => {
    const container = document.createElement('div');
    
    const handleTemplate = async () => {
        const template =  await fetch('/view/administracao/index.html').then((data) => data.text());
        container.innerHTML = template;

        getDadosTabela();

        const categoria = document.getElementById('input-categoria') == null ? '' : document.getElementById('input-categoria');
        let categoriaValue;
        const img = document.getElementById('input-img') == null ? '' : document.getElementById('input-img');
        let imgBase64; 

        img.addEventListener("change", e => {
            const file = img.files[0];
            const reader = new FileReader();  

            reader.addEventListener("load", () => {
                imgBase64 = reader.result;
            })
            reader.readAsDataURL(file)
        })

        categoria.addEventListener("change", () => {
            categoriaValue = categoria.value;
        })

        const spinner = document.getElementById('spinner');
        
        document.getElementById('btn-submit').addEventListener('click', function(e){
            const nome = document.getElementById('input-nome') == null ? '' : document.getElementById('input-nome');
            const marca = document.getElementById('input-marca') == null ? '' : document.getElementById('input-marca');
            const fabricante = document.getElementById('input-fabricante') == null ? '' : document.getElementById('input-fabricante');
            const preco = document.getElementById('input-preco') == null ? '' : document.getElementById('input-preco');
            const estoque = document.getElementById('input-estoque') == null ? '' : document.getElementById('input-estoque');
            const sobre = document.getElementById('input-sobre') == null ? '' : document.getElementById('input-sobre');

             e.preventDefault();
            this.classList.add("d-none");
            spinner.classList.remove("d-none")
            fetch('http://localhost:3000/produtos/new', {
            method: 'POST',
            body:JSON.stringify({
                nome:nome.value,
                categoriaId:categoriaValue,
                marca:marca.value,
                fabricante:fabricante.value,
                preco:preco.value,
                estoque:estoque.value,
                sobre:sobre.value,
                img:imgBase64
            }),
            headers:{
                "Content-Type":"application/json; charset=UTF-8",
                "x-access-token":getCookie('token')
            }
            })
            .then(response => response.json())
            .then(json => {
                this.classList.remove("d-none");
                spinner.classList.add("d-none");
                getDadosTabela();
            })
        })
    }

    function getDadosTabela(){

        fetch('http://localhost:3000/produtos/', {
            method: 'GET',
            headers:{
                "Content-Type":"application/json; charset=UTF-8",
                "x-access-token":getCookie('token')
            }
        })
        .then(response => response.json())
        .then(json => {
            const tabela = document.getElementById('tabela').getElementsByTagName('tbody')[0];
            tabela.innerHTML = "";
            json.forEach(element => {
                let row = tabela.insertRow();
                row.innerHTML = 
                    `<td>${element.id}</td>
                    <td>
                        <button value="${element.id}" type="button" class="btn-editar btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalEditar">Editar</button>
                        <button value="${element.id}" type="button" class="btn-excluir btn btn-danger" data-bs-toggle="modal" data-bs-target="#modalExcluir">Excluir</button>
                    </td>
                    <td>${element.nome}</td>
                    <td>${element.categoria}</td>
                    <td>${element.marca}</td>
                    <td>${element.fabricante}</td>
                    <td>${element.preco}</td>
                    <td>${element.estoque}</td>`; 
            });

            const btnEditar = document.querySelectorAll('.btn-editar');
                    
            btnEditar.forEach((btn) => {
                btn.addEventListener('click', () => {
                    let produtoId;
                    const nome = document.getElementById('modal-nome') == null ? '' : document.getElementById('modal-nome');
                    const marca = document.getElementById('modal-marca') == null ? '' : document.getElementById('modal-marca');
                    const fabricante = document.getElementById('modal-fabricante') == null ? '' : document.getElementById('modal-fabricante');
                    const preco = document.getElementById('modal-preco') == null ? '' : document.getElementById('modal-preco');
                    const estoque = document.getElementById('modal-estoque') == null ? '' : document.getElementById('modal-estoque');
                    const sobre = document.getElementById('modal-sobre') == null ? '' : document.getElementById('modal-sobre');
                    const img = document.getElementById('modal-img') == null ? '' : document.getElementById('modal-img');
                    let imgBase64; 
                    const categoria = document.getElementById('modal-categoria') == null ? '' : document.getElementById('modal-categoria');
                    let categoriaValue2;

                    img.addEventListener("change", e => {
                        const file = img.files[0];
                        const reader = new FileReader();  
            
                        reader.addEventListener("load", () => {
                            imgBase64 = reader.result;
                        })
                        reader.readAsDataURL(file)
                    })

                    categoria.addEventListener("change", () => {
                        categoriaValue2 = categoria.value;
                    })

                    fetch(`http://localhost:3000/produtos/${btn.value}`, {
                        method: 'GET',
                        headers:{
                            "Content-Type":"application/json; charset=UTF-8",
                            "x-access-token":getCookie('token')
                        }
                        })
                        .then(response => response.json())
                        .then(json => {
                            produtoId = json.id
                            nome.value = json.nome
                            marca.value = json.marca
                            fabricante.value = json.fabricante
                            preco.value = json.preco
                            estoque.value = json.estoque
                            sobre.value = json.sobre
                        })  

                        document.getElementById('btn-submit-alteracao').addEventListener('click', function(){
                            fetch('http://localhost:3000/produtos/edit', {
                                method: 'PUT',
                                body:JSON.stringify({
                                    id:produtoId,
                                    nome:nome.value,
                                    categoriaId:categoriaValue2,
                                    marca:marca.value,
                                    fabricante:fabricante.value,
                                    preco:preco.value,
                                    estoque:estoque.value,
                                    sobre:sobre.value,
                                    img:imgBase64
                                }),
                                headers:{
                                    "Content-Type":"application/json; charset=UTF-8",
                                    "x-access-token":getCookie('token')
                                }
                                })
                                .then(getDadosTabela())
                        })
                })
            })

            const btnEcluir = document.querySelectorAll('.btn-excluir');
            btnEcluir.forEach((btn) => {
                btn.addEventListener('click', () => {
                    document.getElementById('btn-submit-delecao').addEventListener('click', function(){
                        fetch(`http://localhost:3000/produtos/delete/${btn.value}`, {
                            method: 'DELETE',
                            body:JSON.stringify({
                                id:btn.value
                            }),
                            headers:{
                                "Content-Type":"application/json; charset=UTF-8",
                                "x-access-token":getCookie('token')
                            }
                            })
                            .then(getDadosTabela())
                    })
                })   
            })
        })
    }

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
      }

    handleTemplate();

    return container;
}