export default () => {
    const container = document.createElement('div');
    const section = document.createElement("section");
    const text = document.createElement("h5");
    section.classList.add("mt-5");
    section.classList.add("text-center");
    section.appendChild(text);
    container.appendChild(section);
    
    const handleTemplate = async () => {
        
        text.innerHTML =  await fetch('/info.txt').then((data) => data.json()).then(json => json.tecnologia);
    }
    
    handleTemplate();

    return container;
}