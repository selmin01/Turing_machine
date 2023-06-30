export default class ElementosDeSaida {
  private _fita: HTMLUListElement
  private _spanEstadoAtual: HTMLSpanElement
  private _spanEstadoInicial: HTMLSpanElement
  private _spanEstadoAceitacao: HTMLSpanElement
  private _spanEstadoRejeicao: HTMLSpanElement
  private _spanTransicaoAtual: HTMLSpanElement
  private _spanAlfabetoEntrada: HTMLSpanElement
  private _spanAlfabetoFita: HTMLSpanElement
  private _spanConjEstados: HTMLSpanElement
  private _ulTransicoes: HTMLUListElement
  private _spanSituacaoAtual: HTMLSpanElement

  constructor() {
    const fita: HTMLUListElement | null =
      document.querySelector("#fita")
    if (!fita) throw new Error("Fita não identificada.")
    this._fita = fita

    const spanEstadoInicial: HTMLSpanElement | null =
      document.querySelector("#q0-content")
    if (!spanEstadoInicial) throw new Error("Span de estado inicial não identificado.")
    this._spanEstadoInicial = spanEstadoInicial
    
    const spanEstadoRejeicao: HTMLSpanElement | null =
      document.querySelector("#qR-content")
    if (!spanEstadoRejeicao) throw new Error("Span de estado de rejeição não identificado.")
    this._spanEstadoRejeicao = spanEstadoRejeicao

    const spanEstadoAceitacao: HTMLSpanElement | null =
      document.querySelector("#qA-content")
    if (!spanEstadoAceitacao) throw new Error("Span de estado de aceitação não identificado.")
    this._spanEstadoAceitacao = spanEstadoAceitacao

    const spanEstadoAtual: HTMLSpanElement | null =
      document.querySelector("#estado-atual-content")
    if (!spanEstadoAtual) throw new Error("Span de estado atual não identificado.")
    this._spanEstadoAtual = spanEstadoAtual

    const spanSituacaoAtual: HTMLSpanElement | null =
      document.querySelector("#situacao-atual-content")
    if (!spanSituacaoAtual) throw new Error("Span de situacao atual não identificado.")
    this._spanSituacaoAtual = spanSituacaoAtual

    const spanTransicaoAtual: HTMLSpanElement | null =
      document.querySelector("#transicao-atual-content")
    if (!spanTransicaoAtual) throw new Error("Span de transicao atual não identificado.")
    this._spanTransicaoAtual = spanTransicaoAtual

    const spanAlfabetoEntrada: HTMLSpanElement | null =
      document.querySelector("#alfabeto-entrada-content")
    if (!spanAlfabetoEntrada) throw new Error("Span de alfabeto de entrada não identificado.")
    this._spanAlfabetoEntrada = spanAlfabetoEntrada

    const spanAlfabetoFita: HTMLSpanElement | null =
      document.querySelector("#alfabeto-fita-content")
    if (!spanAlfabetoFita) throw new Error("Span de alfabeto da fita não identificado.")
    this._spanAlfabetoFita = spanAlfabetoFita

    const spanConjEstados: HTMLSpanElement | null =
      document.querySelector("#conjunto-estados-content")
    if (!spanConjEstados) throw new Error("Span de conjunto de estados não identificado.")
    this._spanConjEstados = spanConjEstados

    const ulTransicoes: HTMLUListElement | null =
      document.querySelector("#transicoes-content")
    if (!ulTransicoes) throw new Error("UL do conjunto de transicoes não identificado.")
    this._ulTransicoes = ulTransicoes
  }

  get fita() { return this._fita }
  get spanEstadoAtual() { return this._spanEstadoAtual }
  get spanEstadoInicial() { return this._spanEstadoInicial }
  get spanEstadoAceitacao() { return this._spanEstadoAceitacao }
  get spanEstadoRejeicao() { return this._spanEstadoRejeicao }
  get spanTransicaoAtual() { return this._spanTransicaoAtual }
  get spanAlfabetoEntrada() { return this._spanAlfabetoEntrada }
  get spanAlfabetoFita() { return this._spanAlfabetoFita }
  get spanConjEstados() { return this._spanConjEstados }
  get ulTransicoes() { return this._ulTransicoes }
  get spanSituacaoAtual() { return this._spanSituacaoAtual }
}