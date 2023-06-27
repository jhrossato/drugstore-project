export default () => {
    const container = document.createElement('div');
    
    const handleTemplate = async () => {
        const template =  await fetch('/view/dermocosmeticos/index.html').then((data) => data.text());
        container.innerHTML = template;
    }
    
    handleTemplate();

    return container;
}