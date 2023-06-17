export default () => {
    const container = document.createElement('div');

    const template = `
    <h2>Pagina home 2<h2>
    `;

    container.innerHTML = template;
    return container;
}