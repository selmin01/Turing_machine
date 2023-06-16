import MaquinaTuring, { Estado, Fita, IAtualizacaoMaquina, IDadosMaquinaTuring, Parada, Transicao } from "../logic/MaquinaTuring"
import { moverParaDireita, preencherCelulasMT } from "./ui"

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



export interface IViewStatus {
  ulFita: HTMLUListElement
  primeiraCelula: HTMLLIElement
  celulaAtual: HTMLLIElement
  posAtual: number
  estadoAtual: Estado
  qtdTransicoesParaAtualizacao: number
}

function aplicarTransicao(viewStatus: IViewStatus, fitaAtualizada: Fita, t: Transicao) {
  const [conteudo, novoEstado, cabecote] = fitaAtualizada
  const [, , estDestino, simbEscrita, mov] = t
  let { ulFita, celulaAtual, qtdTransicoesParaAtualizacao, posAtual } = viewStatus
  qtdTransicoesParaAtualizacao++

  celulaAtual.innerText = simbEscrita

  if (qtdTransicoesParaAtualizacao > 11) {
    preencherCelulasMT(ulFita, posAtual, conteudo)
    qtdTransicoesParaAtualizacao = 0
  }
  
  if (mov === "Direita") {
    moverParaDireita(ulFita, 60)
    celulaAtual = celulaAtual.nextElementSibling as HTMLLIElement
  }
  else {
    moverParaDireita(ulFita, -60)
    celulaAtual = celulaAtual.previousElementSibling
      ? celulaAtual.previousElementSibling as HTMLLIElement
      : celulaAtual
  }
}

function finalizarComputacao(p: Parada) {
  console.log("Parou!")
}

export default function submitDadosMT(dados: IDadosMaquinaTuring): MaquinaTuring {
  const ulFita: HTMLUListElement = document.getElementById("fita") as HTMLUListElement
  ulFita.style.transition = "transform 0.3s ease"
  let primeiraCelula: HTMLLIElement = document.getElementById("primeira-celula") as HTMLLIElement
  let celulaAtual: HTMLLIElement = primeiraCelula
  let posAtual = 0
  let estadoAtual: Estado = dados.q_0
  let qtdTransicoesParaAtualizacao = 0

  ulFita.innerHTML = ''
  preencherCelulasMT(ulFita, 0, '')

  const viewStatus: IViewStatus = { ulFita, primeiraCelula, celulaAtual, posAtual, estadoAtual, qtdTransicoesParaAtualizacao}

  const atualizacaoView: IAtualizacaoMaquina = {
    aplicarTransicao: (f: Fita, t: Transicao) => aplicarTransicao(viewStatus, f, t),
    finalizarComputacao
  }

  return new MaquinaTuring(dados, atualizacaoView)
}

const mockDadosMaquina: IDadosMaquinaTuring = {
  Q: ["q0", "q1", "q2", "q3", "q4", "q_rejeita"],
  δ: [
    ["q0", "0", "q0", "0", "Direita"], // Stay in q0 and write 0, move right
    ["q0", "1", "q0", "1", "Direita"], // Stay in q0 and write 1, move right
    ["q0", " ", "q1", "1", "Esquerda"], // Move to q1 and write 1, move left
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

// if (elemFita) {
//   document.addEventListener("keydown", (e) => {
//     if (e.code === "ArrowLeft") {
//       moverParaDireita(elemFita, 60)
//     } else if (e.code === "ArrowRight") {
//       moverParaDireita(elemFita, -60)
//     }
//   })
// }

function iniciarComputacao(mt: MaquinaTuring, w: string) {
  mt.rodar(w)
}

const MT = submitDadosMT(mockDadosMaquina)
iniciarComputacao(MT, "0101")

