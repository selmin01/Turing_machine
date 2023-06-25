
console.log("Hello from machine_turing")

const arrayItem: {}[] = [];
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
    const estadoDestino = formData.get('estadoDestino');
    const escrita = formData.get('escrita');
    const movimento = formData.get('movimento');

    // Adicionando objetos ao array
    arrayItem.push({ 'Estado': estado, 'Tipo': tipo, 'Leitura': leitura, 'EstadoDestino': estadoDestino, 'Escrita': escrita, 'Movimento': movimento });
    console.log(arrayItem);

    // Cria um novo item de lista com as informações do formulário
    const listItem = document.createElement("li");
    listItem.textContent = `    Estado: ${estado}, <br>
                                Tipo: ${tipo}, <br>
                                Lê: ${leitura}, <br>
                                Vai: ${estadoDestino}, <br>
                                Escreve: ${escrita}, <br>
                                Movimenta: ${movimento} <br>===============<br>`;

    if(infoList){
        infoList.push(listItem.textContent);
    }

    // Exibe os valores dos campos na div "right-panel"
    const rightPanelElement = document.querySelector("#quadro");
    if (rightPanelElement) {
        rightPanelElement.innerHTML = `${infoList}`;
        // infoList.forEach(element => {
        //     rightPanelElement.innerHTML = `[${element}]`;
        // });
    }
  
}

// const botao = document.querySelector('#removeEstado') as HTMLFormElement;
// botao.addEventListener('submit',removeEstado)
// const botao = document.getElementById('removeEstado');
// botao.on
// botao.addEventListener('click', removeEs);

function removeEstado() {
    infoList.pop;
}
