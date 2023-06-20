export default () => {
    const container = document.createElement('div');
    const section = document.createElement("section");
    const text = document.createElement("h5");
    section.classList.add("mt-5");
    section.classList.add("text-center");
    section.appendChild(text);
    container.appendChild(section);
    
    const handleTemplate = async () => {
        const template =  await fetch('/view/sobre/index.html').then((data) => data.text());
        text.innerHTML = await fetch('/info.txt').then((data) => data.json()).then(json => json.sobre);
        container.innerHTML += template;
    }
    
    handleTemplate();

    return container;
}