import MaquinaTuring, { Estado, Fita, IControladorMaquina, IDadosMaquinaTuring, Parada, Tick, Transicao } from "../logic/MaquinaTuring"
import { animarTransicaoCelula, falsoMovimentoAEsquerda, moverCabecoteDireita, moverCabecoteEsquerda, preencherCelulasMT } from "./ui"

// export interface IAtualizacaoMaquina {
//   aplicarTransicao: (f: Fita, t: Transicao) => void
//   finalizarComputacao: (p: Parada) => void
// }
// export interface IDadosMaquinaTuring {
//   Q: Estado[],
//   δ: Transicao[],
//   q_0: Estado,
//   q_aceita: Estado
//   q_rejeita: Estado
// }

// export interface IViewStatus {
//   ulFita: HTMLUListElement
//   conteudo: string
//   celulaAtual: HTMLLIElement
//   posAtual: number
//   estadoAtual: Estado
//   qtdTransicoesParaAtualizacao: number
// }

function criarControladorMT(
  dados: IDadosMaquinaTuring
): IControladorMaquina {
  
  const ulFita: HTMLUListElement = document.getElementById("fita") as HTMLUListElement
  let conteudo: string = ''
  let posAtual: number = 0
  let estadoAtual: Estado = dados.q_0
  let qtdTransicoesParaAtualizacao: number = 0
  let tick: Tick = 1

  ulFita.style.transitionDuration = `${(1000 / tick) * 0.75}ms`

  let celulaAtual = preencherCelulasMT(ulFita, 0, conteudo)

  function iniciarMaquinaTuring(w: string): void {
    conteudo = w
    celulaAtual = preencherCelulasMT(ulFita, 0, conteudo)
  }

  function aplicarTransicao(t: Transicao): void {
    const [,, estDestino, simbEscrita, mov] = t

    conteudo = conteudo.slice(0, posAtual) + simbEscrita + conteudo.slice(posAtual + 1)
    celulaAtual.innerText = simbEscrita
    estadoAtual = estDestino
  
    if (mov === "Direita") {
      moverCabecoteDireita(ulFita)
      animarTransicaoCelula(celulaAtual, tick)
      celulaAtual = celulaAtual.nextElementSibling as HTMLLIElement
      posAtual++
    }
    else {
      const celulaAnterior = celulaAtual.previousElementSibling as HTMLLIElement
      if (celulaAnterior) {
        moverCabecoteEsquerda(ulFita)
        animarTransicaoCelula(celulaAtual, tick)
        celulaAtual = celulaAnterior
        posAtual--
      } else {
        falsoMovimentoAEsquerda(ulFita, tick)
        animarTransicaoCelula(celulaAtual, tick)
        console.log("Falso movimento a esquerda!")
      }
    }

    qtdTransicoesParaAtualizacao++
    if (qtdTransicoesParaAtualizacao > 11) {
      celulaAtual = preencherCelulasMT(ulFita, posAtual, conteudo)
      qtdTransicoesParaAtualizacao = 0
    }
  }

  function finalizarComputacao(p: Parada) {
    console.log("Parou!")
  }

  function alterarTick(t: Tick) {
    tick = t
    const tickTime = (1000 / t) * 0.75
    ulFita.style.transitionDuration = `${tickTime}ms`
  }

  return { iniciarMaquinaTuring, aplicarTransicao, finalizarComputacao, alterarTick }
}



export default function submitDadosMT(dados: IDadosMaquinaTuring): MaquinaTuring {
  const controladorMT: IControladorMaquina = criarControladorMT(dados)
  return new MaquinaTuring(dados, controladorMT)
}

const mockDadosMaquina: IDadosMaquinaTuring = {
  Q: ["q0", "q1", "q2", "q3", "q4", "q_rejeita"],
  δ: [
    ["q0", "0", "q0", "1", "Direita"], // Stay in q0 and write 1, move right
    ["q0", "1", "q0", "0", "Direita"], // Stay in q0 and write 0, move right
    ["q0", " ", "q0", "1", "Direita"], // Move to q1 and write 1, move left
    ["q1", "0", "q2", "1", "Esquerda"], // Move to q2 and write 1, move left
    ["q1", "1", "q1", "0", "Esquerda"], // Stay in q1 and write 0, move left
    ["q2", "0", "q2", "0", "Esquerda"], // Stay in q2 and write 0, move left
    ["q2", "1", "q2", "1", "Esquerda"], // Stay in q2 and write 1, move left
    ["q2", " ", "q3", "1", "Direita"], // Move to q3 and write 1, move right
    ["q3", "0", "q3", "0", "Direita"], // Stay in q3 and write 0, move right
    ["q3", "1", "q3", "1", "Direita"], // Stay in q3 and write 1, move right
    ["q3", " ", "q4", " ", "Esquerda"], // Move to q4, write blank, stop
  ],
  q_0: "q0",
  q_aceita: "q4",
  q_rejeita: "q_rejeita",
};

const mt = submitDadosMT(mockDadosMaquina)

const initMTButton = document.querySelector("#initMT")
initMTButton?.addEventListener("click", () => {
  mt.iniciar("0101")
})
const startMTButton = document.querySelector("#startMT")
startMTButton?.addEventListener("click", () => {
  mt.rodar()
})
const tick1Button = document.querySelector("#tick1")
tick1Button?.addEventListener("click", () => {
  mt.mudarTick(1)
})
const tick2Button = document.querySelector("#tick2")
tick2Button?.addEventListener("click", () => {
  mt.mudarTick(2)
})
const tick4Button = document.querySelector("#tick4")
tick4Button?.addEventListener("click", () => {
  mt.mudarTick(4)
})
const tick8Button = document.querySelector("#tick8")
tick8Button?.addEventListener("click", () => {
  mt.mudarTick(8)
})

