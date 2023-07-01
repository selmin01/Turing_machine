import ErrorHandler from "../components/ErrorHandler";
import criarMaquinaTuring from "../machine/criarMaquinaTuring";
import { IEntradaMT, Transicao, isMovimento, isSimbolo } from "../machine/logic/MaquinaTuring";

const formAddTransicao: HTMLFormElement | null =
    document.querySelector('#form-transicao') as HTMLFormElement;
if (!formAddTransicao) throw new Error("Formulário de transições não identificado.")

const formEstadosEspeciais: HTMLFormElement | null =
    document.querySelector("#form-estados-especiais")
if (!formEstadosEspeciais) throw new Error("Formulário de estados especiais não identificado.")

const botaoRemoverTransicao: HTMLButtonElement | null =
    document.querySelector("#remover-transicao")
if (!botaoRemoverTransicao) throw new Error("Botão de remover transição não identificado.")

const ulTransicoes: HTMLUListElement | null =
    document.querySelector("#transicoes");
if (!ulTransicoes) throw new Error("Lista de transicoes não identificada.")

const botaoCriarMT: HTMLButtonElement | null =
    document.querySelector("#criar-mt")
if (!botaoCriarMT) throw new Error("Botão de criar MT não identificado.")

const spanTituloTransicoes: HTMLSpanElement | null =
    document.querySelector("#transicoes-title")
if (!spanTituloTransicoes) throw new Error("Span do título de transições não identificado.")

const arrayTransicoes: Transicao[] = [];

const errorsData: string | null = localStorage.getItem("errors")
if (errorsData) {
    console.log("Errors Data: " + errorsData)
    const errors: string[] = JSON.parse(errorsData)
    errors.forEach(error => ErrorHandler.instance.showError(error))    
    localStorage.removeItem("errors")
}

formAddTransicao.addEventListener('submit', (event: SubmitEvent) => {
    try { 
    // Evita o comportamento padrão do envio do formulário
    event.preventDefault();
  
    // Cria um objeto FormData com os dados do formulário
    const formData = new FormData(formAddTransicao);
  
    // Obtém os valores dos campos
    const estadoOrigem = formData.get('estado')?.toString();
    let simboloLeitura = formData.get('leitura')?.toString();
    const estadoDestino = formData.get('estadoDestino')?.toString();
    let simboloEscrita = formData.get('escrita')?.toString();
    const movimento = formData.get('movimento')?.toString();

    // Transformação de caracter vazio em caracter espaço
    if (!simboloLeitura) simboloLeitura = ' '
    if (!simboloEscrita) simboloEscrita = ' '

    // Validação dos dados de inserção da nova transição criada
    if (!isSimbolo(simboloLeitura) || !isSimbolo(simboloEscrita))
        throw new Error("O símbolo precisa ter um e somente um caracter!")
    if (!estadoOrigem || !estadoDestino)
        throw new Error("Insira estados de origem e destino!")
    if (!isMovimento(movimento))
        throw new Error("Movimento inválido!")
    
    if (spanTituloTransicoes.textContent === "As transições da sua máquina aparecerão aqui!")
        spanTituloTransicoes.textContent = "Transições:"

    // Criação da nova transição
    const novaTransicao: Transicao =
        [estadoOrigem, simboloLeitura, estadoDestino, simboloEscrita, movimento]

    // Cria um novo item de lista com as informações do formulário
    const listItem = document.createElement("li");
    listItem.textContent = `
        δ(${estadoOrigem}, '${simboloLeitura}') = 
        (${estadoDestino}, '${simboloEscrita}', ${movimento})`
    
    // Nova transição adicionada tanto na lista do HTML quanto na estrutura de dados
    ulTransicoes.appendChild(listItem)
        arrayTransicoes.push(novaTransicao)
    } catch (error) {
        ErrorHandler.instance.showError(error as string)
    }
});

botaoRemoverTransicao.addEventListener("click", () => {
    if (arrayTransicoes.length > 0) {
        ulTransicoes.lastElementChild?.remove()
        arrayTransicoes.pop()
    }
})

botaoCriarMT.addEventListener("click", () => {
    try {
        
        const estadosEspeciaisFormData = new FormData(formEstadosEspeciais)
        
        const q0 = estadosEspeciaisFormData.get("q0")?.toString()
        const qA = estadosEspeciaisFormData.get("qA")?.toString()
        const qR = estadosEspeciaisFormData.get("qR")?.toString()
        
        if (!(q0 && qA && qR)) throw new Error("Os estados especiais precisam ser definidos!")
        
        const entradaMT: IEntradaMT = {
            δ: arrayTransicoes,
            q0, qA, qR
        }
        
        localStorage.setItem("entradaMT", JSON.stringify(entradaMT))
        window.location.href = "/machine.html"
        
    } catch (error) {
        ErrorHandler.instance.showError(error as string)
    }
})

const buttonAddErrors = document.querySelector("#adderrors")
buttonAddErrors?.addEventListener("click", () =>
    ErrorHandler.instance.showError("Mensagem de erro - Teste"))