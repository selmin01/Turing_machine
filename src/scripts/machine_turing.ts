
console.log("Hello from machine_turing")

const infoList: string[] = [];

const form = document.querySelector('#cadastroEstado') as HTMLFormElement;
console.log(form);

form.addEventListener('submit', handleSubmit);

function handleSubmit(event: SubmitEvent) {
    event.preventDefault(); // Evita o comportamento padrão do envio do formulário
  
    const formData = new FormData(form); // Cria um objeto FormData com os dados do formulário
  
    // Obtém os valores dos campos
    const estado = formData.get('estado');
    const tipo = formData.get('tipo');
    const leitura = formData.get('leitura');
    const escrita = formData.get('escrita');
    const movimento = formData.get('movimento');

    // Cria um novo item de lista com as informações do formulário
    const listItem = document.createElement("li");
    listItem.textContent = `    Estado: ${estado}, <br>
                                Tipo: ${tipo}, <br>
                                Lê: ${leitura}, <br>
                                Escreve: ${escrita}, <br>
                                Vai: ${movimento}, <br>`;

    if(infoList){
        infoList.push(listItem.textContent);
        console.log(infoList);
    }

    // Exibe os valores dos campos na div "right-panel"
    const rightPanelElement = document.querySelector("#quadro");
    if (rightPanelElement) {
        rightPanelElement.innerHTML = `=> Estado: ${estado}<br>Tipo: ${tipo}`;
        rightPanelElement.innerHTML = `[${infoList}]`;
        // infoList.forEach(element => {
        //     rightPanelElement.innerHTML = `[${element}]`;
        // });
    }
  
}
