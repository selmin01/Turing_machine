import { IEntradaMT, Transicao, isMovimento, isSimbolo } from "../machine/logic/MaquinaTuring";

const arrayItem: Transicao[] = [];
const infoList: string[] = [];

const form = document.querySelector('#cadastroEstado') as HTMLFormElement;
console.log(form);

form.addEventListener('submit', handleSubmit);

function handleSubmit(event: SubmitEvent) {
    event.preventDefault(); // Evita o comportamento padrão do envio do formulário
  
    const formData = new FormData(form); // Cria um objeto FormData com os dados do formulário
  
    // Obtém os valores dos campos
    const tipo = formData.get('tipo')?.toString();

    const estadoOrigem = formData.get('estado')?.toString();
    const simboloLeitura = formData.get('leitura')?.toString();
    
    const estadoDestino = formData.get('estadoDestino')?.toString();
    const simboloEscrita = formData.get('escrita')?.toString();
    const movimento = formData.get('movimento')?.toString();

    if (!isSimbolo(simboloLeitura) || !isSimbolo(simboloEscrita))
        throw new Error("O símbolo precisa ter um e somente um caracter!")
    
    if (!estadoOrigem || !estadoDestino)
        throw new Error("Insira estados de origem e destino!")
    
    if (!isMovimento(movimento))
        throw new Error("Movimento inválido!")

    // Adicionando objetos ao array
    // arrayItem.push({
    //     'Estado': estado,
    //     'Tipo': tipo,
    //     'Leitura': leitura,
    //     'EstadoDestino': estadoDestino,
    //     'Escrita': escrita,
    //     'Movimento': movimento
    // });

    arrayItem.push([estadoOrigem, simboloLeitura, estadoDestino, simboloEscrita, movimento])
    console.log(arrayItem);

    // Cria um novo item de lista com as informações do formulário
    const listItem = document.createElement("li");
    listItem.textContent = `    Estado: ${estadoOrigem}, <br>
                                Tipo: ${tipo}, <br>
                                Lê: ${simboloLeitura}, <br>
                                Vai: ${estadoDestino}, <br>
                                Escreve: ${simboloEscrita}, <br>
                                Movimento: ${movimento} <br>===============<br>`;

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
