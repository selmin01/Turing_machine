import MaquinaTuring, { Estado, Fita, IControladorMaquina, IDadosMaquinaTuring, IEntradaMT, Parada, Tick, Transicao } from "../logic/MaquinaTuring"
import Icons from "./icons"
import ControladorUIMT, { IElementosComEstado } from "./ControladorUIMT"
import criarMaquinaTuring from "../../criarMaquinaTuring"

export default class ElementosDeEntrada {
  private _maquinaTuring: MaquinaTuring

  private _anchorConfiguracoes: HTMLAnchorElement
  private _inputPalavra: HTMLInputElement
  private _botaoPlayPause: HTMLButtonElement
  private _botaoInserirPalavra: HTMLButtonElement
  private _botaoReset: HTMLButtonElement
  private _mostradorVelocidade: HTMLSpanElement
  private _botaoDesaceleracao: HTMLButtonElement
  private _botaoAceleracao: HTMLButtonElement

  private _rodando: boolean = false

  private eventoPlayPause = (e: MouseEvent) => {
    if (this._maquinaTuring.status === "Não iniciada") {
      this._maquinaTuring.rodar()
      this._botaoPlayPause.innerHTML = ""
      this._botaoPlayPause.appendChild(Icons.pauseIcon(48, "#111414"))
    } else {
      if (!this._rodando) {
        this._maquinaTuring.retomar()
        this._botaoPlayPause.innerHTML = ""
        this._botaoPlayPause.appendChild(Icons.pauseIcon(48, "#111414"))
      } else {
        this._maquinaTuring.pausar()
        this._botaoPlayPause.innerHTML = ""
        this._botaoPlayPause.appendChild(Icons.playIcon(48, "#111414"))
      }
    }

    this._rodando = !this._rodando
  }

  private eventoInserirPalavra = (e: MouseEvent) => {
    if (this._rodando) {
      this._botaoPlayPause.innerHTML = ''
      this._botaoPlayPause.appendChild(Icons.playIcon(48, "#111414"))
      this._rodando = false
    }

    this._maquinaTuring.inicializar(this._inputPalavra.value)
  }

  private eventoReset = (e: MouseEvent) => {
    this._maquinaTuring.reinicializar()
    if (this._rodando) {
      this._botaoPlayPause.innerHTML = ""
      this._botaoPlayPause.appendChild(Icons.playIcon(48, "#111414"))
      this._rodando = false
    }
  }

  private eventoDesaceleracao = (e: MouseEvent) => {
    let novoTick: Tick

      switch (this._maquinaTuring.tick) {
        case 1:
          return
        case 2:
          novoTick = 1
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
    
    this._maquinaTuring.mudarTick(novoTick)
    this._mostradorVelocidade.innerText = `x${novoTick}`
  }

  private eventoAceleracao = (e: MouseEvent) => {
    let novoTick: Tick
    
    switch (this._maquinaTuring.tick) {
      case 1:
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

    this._maquinaTuring.mudarTick(novoTick)
    this._mostradorVelocidade.innerText = `x${novoTick}`
  }

  constructor(maquinaTuring: MaquinaTuring) {
    this._maquinaTuring = maquinaTuring

    const inputPalavra: HTMLInputElement | null =
      document.querySelector("#inputPalavra")
    if (!inputPalavra) throw new Error("Input de palavra não identificado.")
    this._inputPalavra = inputPalavra
    
    const anchorConfiguracoes: HTMLAnchorElement | null =
      document.querySelector("#settings")
    if (!anchorConfiguracoes) throw new Error("Ícone de configurações não identificado.")
    anchorConfiguracoes.appendChild(Icons.settingsIcon(48, "#111414"))
    this._anchorConfiguracoes = anchorConfiguracoes

    const botaoPlayPause: HTMLButtonElement | null =
      document.querySelector("#play-pause")
    if (!botaoPlayPause) throw new Error("Botão play/pause não identificado.")
    botaoPlayPause.appendChild(Icons.playIcon(48, "#111414"))
    botaoPlayPause.addEventListener("click", this.eventoPlayPause)
    this._botaoPlayPause = botaoPlayPause

    const botaoInserirPalavra: HTMLButtonElement | null =
      document.querySelector("#inserirPalavra")
    if (!botaoInserirPalavra) throw new Error("Botão de inserir palavra não identificado.")
    botaoInserirPalavra.addEventListener("click", this.eventoInserirPalavra)
    this._botaoInserirPalavra = botaoInserirPalavra

    const botaoReset: HTMLButtonElement | null =
      document.querySelector("#reset")
    if (!botaoReset) throw new Error("Botão reset não encontrado.")
    botaoReset.appendChild(Icons.resetIcon(36, "#111414"))
    botaoReset.addEventListener("click", this.eventoReset)
    this._botaoReset = botaoReset

    const mostradorVelocidade: HTMLSpanElement | null =
      document.querySelector("#speed")
    if (!mostradorVelocidade) throw new Error("Mostrador de velocidade não encontrado.")
    mostradorVelocidade.innerText = "x1"
    this._mostradorVelocidade = mostradorVelocidade

    const botaoDesaceleracao: HTMLButtonElement | null =
      document.querySelector("#rewind")
    if (!botaoDesaceleracao) throw new Error("Botão de rewind não encontrado.")
    botaoDesaceleracao.appendChild(Icons.fastRewindIcon(48, "#111414"))
    botaoDesaceleracao.addEventListener("click", this.eventoDesaceleracao)
    this._botaoDesaceleracao = botaoDesaceleracao

    const botaoAceleracao: HTMLButtonElement | null =
      document.querySelector("#forward")
    if (!botaoAceleracao) throw new Error("Botao de aceleração não identificado.")
    botaoAceleracao.appendChild(Icons.fastForwardIcon(48, "#111414"))
    botaoAceleracao.addEventListener("click", this.eventoAceleracao)
    this._botaoAceleracao = botaoAceleracao
  }

}






