export default () => {
    const container = document.createElement('div');
    container.classList.add('row');
    
    const handleTemplate = async () => {
        const template =  await fetch('/view/beleza/index.html').then((data) => data.text());
        container.innerHTML = template;
        fetch(`http://localhost:3000/produtos/nome/Beleza`, {
            method: 'GET',
            headers:{
                "Content-Type":"application/json; charset=UTF-8",
                "x-access-token":getCookie('token')
            }
            })
            .then(response => response.json())
            .then(json => {
                json.forEach(element => {
                    console.log(element)
                    const card =

                    `<div class="col-4 mt-2">
                    <div class="card card-pick" style="width: 18rem;">
                                <input type="hidden" value="${element.id}">
                    <img src="${localStorage.getItem(element.id)}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-text text-center">${element.nome}</h5>
                        <div class="d-flex justify-content-evenly">
                            <h5 class="card-text">R$${element.preco}</h5>
                            <button class="btn btn-success btn-sm">Adicionar ao carrinho</button>
                        </div>
                        
                    </div>
                    </div>
                    </div>`
                    container.innerHTML += card;
                });

                const cards = document.querySelectorAll('.card-pick');
                            cards.forEach((carta) => {
                                carta.addEventListener('click', () => {
                                    console.log(carta.children[0].value)
                                    
                                    window.location.href = '/#detalhes?' + carta.children[0].value
                                    //window.location.search = 
                                })
                            })
            })
    }
    
    handleTemplate();

    return container;
}