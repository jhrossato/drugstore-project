export default () => {
    const container = document.createElement('div');
    container.classList.add('row');
    
    const handleTemplate = async () => {
        const template =  await fetch('/view/detalhes/index.html').then((data) => data.text());
        container.innerHTML = template;

        let locationHash = window.location.hash;
        let produtoid = locationHash.split('?')[1]

        fetch(`http://localhost:3000/produtos/${produtoid}`, {
            method: 'GET',
            headers:{
                "Content-Type":"application/json; charset=UTF-8",
                "x-access-token":getCookie('token')
            }
            })
            .then(response => response.json())
            .then(json => {
                document.getElementById('imagem').src = `http://localhost:3000/image/${json.image}`
                document.getElementById('nome').innerHTML = json.nome
                document.getElementById('preco').innerHTML += json.preco
                document.getElementById('estoque').innerHTML += json.estoque
                document.getElementById('marca').innerHTML = json.marca
                document.getElementById('fabricante').innerHTML = json.fabricante
                document.getElementById('sobre').innerHTML = json.sobre
            })
    }
    
    handleTemplate();

    return container;
}