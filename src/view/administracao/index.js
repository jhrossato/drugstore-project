
export default () => {
    const container = document.createElement('div');
    
    const handleTemplate = async () => {
        const template =  await fetch('/view/administracao/index.html').then((data) => data.text());
        container.innerHTML = template;

        let page;
        let size;

        await getDadosTabela(page, size);
        await getCategoria();
        await setNovoProdutoForm();
        await setNovaCategoriaForm();
        await setEditProdutoForm();    
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
            formData.append("id", json.id);
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
            console.log('AAAAAAAAAAAAAAA')
            e.preventDefault();
            const img = document.getElementById('modal-img') == null ? '' : document.getElementById('modal-img');
            const formData = new FormData(form);
            const formDataObj = Object.fromEntries(formData.entries());
            formDataObj.image = img.files[0].name;
            console.log(JSON.stringify(formDataObj))
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

    function getDadosTabela(page, size){
        
        if(page === undefined || size === undefined){
           page = 0
           size = 3
        }

        fetch(`http://localhost:3000/produtos/paginate?page=${page}&size=${size}`, {
            method: 'GET',
            headers:{
                "Content-Type":"application/json; charset=UTF-8",
                "x-access-token":getCookie('token')
            }
        })
        .then(response => response.json())
        .then(json => {
            const produtosCount = json.count;
            const tabela = document.getElementById('tabela').getElementsByTagName('tbody')[0];
            tabela.innerHTML = "";
            json.rows.forEach(element => {
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

            const paginationElement = document.querySelector('.pagination');
            paginationElement.innerHTML = '';
            paginationElement.innerHTML += 
                `<li class="page-item">
                    <a class="page-link" id="previous" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>`;
            const numberOfPages = Math.ceil(produtosCount / size);
            for (var i = 1; i <= numberOfPages; i++) {
                paginationElement.innerHTML += `<li class="page-item"><a class="page page-link">${i}</a></li>`
            }
            paginationElement.innerHTML += 
                `<li class="page-item">
                    <a class="page-link" id="next" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>`;
            
            const pages = document.querySelectorAll('.page');
            pages.forEach((page) => {
                page.addEventListener('click', (page) => {
                    getDadosTabela(page.srcElement.firstChild.data - 1, 3);
                    
                })
            })
            
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
                        document.getElementById('modal-id').value = produtoId;
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

        return true;
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