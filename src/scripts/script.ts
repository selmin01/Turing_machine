import MaquinaTuring, { Estado, Fita, IControladorMaquina, IDadosMaquinaTuring, Parada, Tick, Transicao } from "../logic/MaquinaTuring"
import Icons from "./icons"
import ControladorUIFita from "./ui"

console.log("Hello from script.ts")

// Ícone de configurações (settings)
const settingsAnchor = document.querySelector("#settings")
settingsAnchor?.appendChild(Icons.settingsIcon(48, "#111414"))

export default function submitDadosMT(dados: IDadosMaquinaTuring): MaquinaTuring {
  const fita: HTMLUListElement | null = document.querySelector("#fita")
  if (!fita) throw new Error("Fita não identificada.")
  const spanEstadoAtual: HTMLSpanElement | null =
    document.querySelector("#estado-atual-content")
  if (!spanEstadoAtual) throw new Error("Span de estado atual não identificado.")
  const spanSituacaoAtual: HTMLSpanElement | null =
    document.querySelector("#situacao-atual-content")
  if (!spanSituacaoAtual) throw new Error("Span de situacao atual não identificado.")
  const spanTransicaoAtual: HTMLSpanElement | null =
    document.querySelector("#transicao-atual-content")
  if (!spanTransicaoAtual) throw new Error("Span de transicao atual não identificado.")

  const controladorMT: IControladorMaquina = new ControladorUIFita({
    fita, spanEstadoAtual, spanSituacaoAtual, spanTransicaoAtual
  })

  return new MaquinaTuring(dados, controladorMT)
}

const mockDadosMaquina: IDadosMaquinaTuring = {
  Q: ["q0", "q1", "q2", "q3", "q4", "q_rejeita"],
  δ: [
    ["q0", "0", "q0", "1", "Direita"], // Stay in q0 and write 1, move right
    ["q0", "1", "q0", "0", "Direita"], // Stay in q0 and write 0, move right
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

let mt = submitDadosMT(mockDadosMaquina)

// Inserir palavra de entrada na MT
const inserirPalavraButton = document.querySelector("#inserirPalavra")
inserirPalavraButton?.addEventListener("click", () => {
  const inputPalavra: HTMLInputElement | null = document.querySelector("#inputPalavra")

  if (!inputPalavra) throw new Error("O input da palavra de entrada não foi identificado.")

  mt.inicializar(inputPalavra.value)
})

// Ícone de play/pause
let playing: boolean = false
const playPauseButton = document.querySelector("#play-pause")
if (!playPauseButton) throw new Error("Botão play/pause não identificado.")
playPauseButton.appendChild(Icons.playIcon(48, "#111414"))
playPauseButton.addEventListener("click", (e) => {
  if (!playing) {
    mt.rodar()
    playPauseButton.innerHTML = ''
    playPauseButton.appendChild(Icons.pauseIcon(48, "#111414"))
  } else {
    mt.pausar()
    playPauseButton.innerHTML = ''
    playPauseButton.appendChild(Icons.playIcon(48, "#111414"))
  }
  playing = !playing;
})

// Ícone de reset
const resetButton = document.querySelector("#reset")
if (!resetButton) throw new Error("Botão reset não encontrado.")
resetButton.appendChild(Icons.resetIcon(36, "#111414"))
resetButton.addEventListener("click", () => {
  mt.reinicializar()
  if (playing) {
    playPauseButton.innerHTML = ''
    playPauseButton.appendChild(Icons.playIcon(48, "#111414"))
    playing = false
  }
})

// Mostrador de velociade
const speed: HTMLSpanElement | null = document.querySelector("#speed")
if (!speed) throw new Error("Mostrador de velocidade não encontrado.")
speed.innerText = "x1"

// Ícone de desaceleração (fast rewind)
const rewindButton = document.querySelector("#rewind")
if (!rewindButton) throw new Error("Botão de rewind não encontrado.")
rewindButton.appendChild(Icons.fastRewindIcon(48, "#111414"))
rewindButton.addEventListener("click", () => {
  let novoTick: Tick

  switch (mt.tick) {
    case 1:
      return
    case 1.25:
      novoTick = 1
      break
    case 1.5:
      novoTick = 1.25
      break
    case 1.75:
      novoTick = 1.5
      break
    case 2:
      novoTick = 1.75
      break
    case 4:
      novoTick = 2
      break
    case 8:
      novoTick = 4
      break
    case 16:
      novoTick = 8
      break
    case 32:
      novoTick = 16
      break
  }

  mt.mudarTick(novoTick)
  speed.innerText = `x${novoTick}`
})

// Ícone de aceleração (fast forward)
const forwardButton = document.querySelector("#forward")
if (!forwardButton) throw new Error("Botão de forward não encontrado.")
forwardButton.appendChild(Icons.fastForwardIcon(48, "#111414"))
forwardButton.addEventListener("click", () => {
  let novoTick: Tick

  switch (mt.tick) {
    case 1:
      novoTick = 1.25
      break
    case 1.25:
      novoTick = 1.5
      break
    case 1.5:
      novoTick = 1.75
      break
    case 1.75:
      novoTick = 2
      break
    case 2:
      novoTick = 4
      break
    case 4:
      novoTick = 8
      break
    case 8:
      novoTick = 16
      break
    case 16:
      novoTick = 32
      break
    case 32:
      return
  }

  mt.mudarTick(novoTick)
  speed.innerText = `x${novoTick}`
})
