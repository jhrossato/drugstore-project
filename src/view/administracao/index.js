
export default () => {
    const container = document.createElement('div');
    
    const handleTemplate = async () => {
        const template =  await fetch('/view/administracao/index.html').then((data) => data.text());
        container.innerHTML = template;

        getDadosTabela();
        getCategoria();
        setNovoProdutoForm();
        setNovaCategoriaForm();
        setEditProdutoForm();   
        const spinner = document.getElementById('spinner');
    }

    function toggleSpinner(button){
        button.classList.toggle("d-none");
        spinner.classList.toggle("d-none");
    }

    function setNovaCategoriaForm(){
        const form = document.getElementById('nova-categoria');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const formDataObj = Object.fromEntries(formData.entries());

            fetch('http://localhost:3000/categorias', {
            method: 'POST',
            body:JSON.stringify(formDataObj),
            headers:{
                "Content-Type":"application/json; charset=UTF-8",
                "x-access-token":getCookie('token')
            }
            })
            .then(response => getCategoria())
        })
    }

    function setNovoProdutoForm(){
        const form = document.getElementById('novo-produto');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const img = document.getElementById('input-img') == null ? '' : document.getElementById('input-img');
            const formData = new FormData(form);
            const formDataObj = Object.fromEntries(formData.entries());
            formDataObj.image = img.files[0].name;
            
            fetch('http://localhost:3000/produtos', {
                method: 'POST',
                body: JSON.stringify(formDataObj),
                headers:{
                    "Content-Type":"application/json; charset=UTF-8",
                    "x-access-token":getCookie('token')
                }
            })
            .then(response => response.json())
            .then(json => {
                formData.append("produtoId", json.id);
                fetch('http://localhost:3000/upload', {
                method: 'POST',
                body: formData
                });
            })
            .then(response => getDadosTabela())
        });
    }

    function setEditProdutoForm(){
        const form = document.getElementById('edit-produto');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const img = document.getElementById('input-img') == null ? '' : document.getElementById('input-img');
            const formData = new FormData(form);
            const formDataObj = Object.fromEntries(formData.entries());
            formDataObj.image = img.files[0].name;

            fetch('http://localhost:3000/produtos', {
                method: 'PUT',
                body:JSON.stringify(formDataObj),
                headers:{
                    "Content-Type":"application/json; charset=UTF-8",
                    "x-access-token":getCookie('token')
                }
            })
            .then(response => response.json())
            .then(json => {
                formData.append("produtoId", json.id);
                fetch('http://localhost:3000/upload', {
                method: 'POST',
                body: formData
                });
            })
            .then(response => getDadosTabela())
        });
    }

    function getDadosTabela(){
        fetch('http://localhost:3000/produtos', {
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
                console.log(element)
                let row = tabela.insertRow();
                row.innerHTML = 
                    `<td>${row.rowIndex}</td>
                    <td>
                        <button value="${element.id}" type="button" class="btn-editar btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalEditar">Editar</button>
                        <button value="${element.id}" type="button" class="btn-excluir btn btn-danger" data-bs-toggle="modal" data-bs-target="#modalExcluir">Excluir</button>
                    </td>
                    <td>${element.nome}</td>
                    <td>${element.categoria.nome}</td>
                    <td>${element.marca}</td>
                    <td>${element.fabricante}</td>
                    <td>${element.preco}</td>
                    <td>${element.estoque}</td>`; 
            });

            document.querySelectorAll('.btn-editar').forEach((btn) => {
                btn.addEventListener('click', () => {
                    let produtoId = btn.value;

                    fetch(`http://localhost:3000/produtos/${produtoId}`, {
                        method: 'GET',
                        headers:{
                            "Content-Type":"application/json; charset=UTF-8",
                            "x-access-token":getCookie('token')
                        }
                    })
                    .then(response => response.json())
                    .then(json => {
                        document.getElementById('modal-id').value = json.id;
                        document.getElementById('modal-nome').value = json.nome
                        document.getElementById('modal-marca').value = json.marca
                        document.getElementById('modal-fabricante').value = json.fabricante
                        document.getElementById('modal-preco').value = json.preco
                        document.getElementById('modal-estoque').value = json.estoque
                        document.getElementById('modal-sobre').value = json.sobre
                    });  
                });
            });

            const btnEcluir = document.querySelectorAll('.btn-excluir');
            btnEcluir.forEach((btn) => {
                btn.addEventListener('click', (e) => {
                    document.getElementById('btn-submit-delecao').addEventListener('click', function(e){
                        e.preventDefault();
                        fetch(`http://localhost:3000/produtos/${btn.value}`, {
                            method: 'DELETE',
                            body:JSON.stringify({
                                id:btn.value
                            }),
                            headers:{
                                "Content-Type":"application/json; charset=UTF-8",
                                "x-access-token":getCookie('token')
                            }
                        })
                        .then(response => {
                            getDadosTabela()
                        });
                    });
                });   
            });
        });
    }

    function getCategoria() {
        fetch('http://localhost:3000/categorias/', {
        method: 'GET',
        headers:{
            "Content-Type":"application/json; charset=UTF-8",
            "x-access-token":getCookie('token')
        }
        })
        .then(response => response.json())
        .then(json => {
            const selects = document.querySelectorAll(".input-categoria");
            selects.forEach((select) => {
                while (select.options.length > 0) {
                    select.remove(0);
                }
                var option = document.createElement("option");
                option.text = 'Selecione';
                select.add(option);
                json.forEach((categoria) => {
                    var option = document.createElement("option");
                    option.text = categoria.nome;
                    option.value = categoria.id;
                    select.add(option);
                });
            });
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