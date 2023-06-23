
console.log("Hello from machine_turing")

// function removeEstado() {
//     console.log('remove');
// }

// function addEstado() {
//     console.log('add');
// const form = document.getElementById("cadastroEstado") as HTMLFormElement;

// form.forEach((element: any) => {
//     console.log(element);
// });

// import express, { Request, Response } from 'express';

// const app = express();
// const port = 8080;

// app.use(express.json()); // Para processar o corpo da requisição como JSON

// app.get('/', (req: Request, res: Response) => {
//   res.send('Requisição GET recebida!');
// });

// const queryString = window.location.search;

// const urlString = new URLSearchParams(queryString);

// const res = urlString.get("cadastroEstado");
// console.log(res);

// const form = document.getElementById("cadastroEstado") as HTMLFormElement;
// // const form = document.getElementById('myForm') as HTMLFormElement;

// form.addEventListener('submit', (event) => {
//   event.preventDefault(); // Impede o envio do formulário
//   console.log(form);

//   const formData = new FormData(form);
//   const estado = formData.get('estado') as string;
//   const tipo = formData.get('tipo') as string;

//   // Faça o que desejar com os dados (por exemplo, enviar para o servidor)
//   alert('Nome:'+ estado);
//   // console.log('Email:', tipo);
// });
console.log("okkk");
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
                                Vai: ${movimento}`;

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
  


// const form = document.getElementById('cadastroEstado') as HTMLFormElement;
// const formData = new FormData(form);

// const estado = formData.get('estado') as string;
// const tipo = formData.get('tipo') as string;

// alert(estado);
// alert(tipo);






// function addEstado() {
//     console.log('add');

//     if(document.cadastroEstado.estado.value==""){
//         console.log("Preencha corretamente o campo estado.");
//     }else if ((!document.cadastroEstado.tipo[0].checked)&&(!document.cadastroEstado.tipo[1].checked)) {
//         console.log("Preencha corretamente o campo tipo.");
//     }

//     return true;
// }