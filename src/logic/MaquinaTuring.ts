export type Estado = string
export type Movimento = "Esquerda" | "Direita"
export type Alfabeto = string
export type Simbolo = string
export type Transicao = [Estado, Simbolo, Estado, Simbolo, Movimento]
export type Tick = 1 | 2 | 4 | 8 | 16 | 32
export type Parada = "Aceitou"
  | "Rejeitou, estado de rejeição"
  | "Rejeitou por indefinição"
export type StatusMaquina = "Não iniciada"
  | "Pausada"
  | "Computando"
  | Parada
export type Fita = {
  conteudo: string
  estadoAtual: Estado
  cabecote: number
}
export interface IEntradaMT {
  δ: Transicao[],
  q0: Estado,
  qA: Estado
  qR: Estado
}
export interface IDadosMaquinaTuring {
  Q: Estado[]
  Σ: Alfabeto
  Γ: Alfabeto
  δ: Transicao[]
  q0: Estado
  qA: Estado
  qR: Estado
}
export interface IControladorMaquina {
  construirMaquinaTuring: (dados: IDadosMaquinaTuring) => void
  inicializarMaquinaTuring: (Σ: Alfabeto, Γ: Alfabeto, w: string) => void
  reinicializarMaquinaTuring: () => void
  iniciarComputacao: () => void
  pausarComputacao: () => void
  aplicarTransicao: (t: Transicao) => void
  finalizarComputacao: (p: Parada) => void
  alterarTick: (t: Tick) => void
}

export function isSimbolo (v: unknown): v is Simbolo {
  if (typeof v != "string")
    return false
      
  return /^.$/.test(v)
}

export function isMovimento(v: unknown): v is Movimento {
  return (typeof v == "string") && (v == "Esquerda" || v == "Direita")
}
  


export default class MaquinaTuring {
  private _Q: Estado[]
  private _Σ: Alfabeto
  private _Γ: Alfabeto
  private _δ: Transicao[]
  private _q0: Estado
  private _qA: Estado
  private _qR: Estado
  private _palavraEntrada: string = ""
  private _tick: Tick
  private _status: StatusMaquina
  private _fita: Fita
  private controlador: IControladorMaquina

  private getDados(): IDadosMaquinaTuring {
    return {
      Q: this._Q,
      Σ: this._Σ,
      Γ: this._Γ,
      δ: this._δ,
      q0: this._q0,
      qA: this._qA,
      qR: this._qR,
    }
  }

  constructor(dadosEntrada: IEntradaMT, controlador: IControladorMaquina) {
    const { δ, q0, qA, qR } = dadosEntrada

    const Q: Estado[] = [
      ...new Set(
        δ.flatMap(([e1, s1, e2, s2, mov]) => [e1, e2])
          .concat([q0, qA, qR])
      )
    ].sort()

    // Verifica se estados possuem espaço no nome
    if (Q.some(estado => estado.includes(" ")))
      throw new Error("Nomes de estados não podem ter espaço!")

    // Verifica se existem estados com o mesmo nome
    if (new Set(Q).size !== Q.length)
      throw new Error("Estados devem ter nomes diferentes!")
    
    // Verifica se os três estados especiais estão contidos no conjunto de estados
    if (!(Q.includes(q0) && Q.includes(qA) && Q.includes(qR)))
      throw new Error("Os estados iniciais, de aceitação e de rejeição devem estar contidos no conjunto de estados!")
    
    // Verifica se os estados de aceitação e rejeição são diferentes
    if (!(qA !== qR))
      throw new Error("Os estados de aceitação e de rejeição devem ser diferentes!")
    
    // Verifica se há duas possibilidades para a mesma transição
    if (
      δ.some(([q1, s1], i1) =>
        δ.filter((_, i2) => i2 !== i1)
         .some(([q2, s2]) => q1 === q2 && s1 === s2))
    )
      throw new Error("Não pode haver duas possibilidades para a mesma transição!")
    
    // Verifica se todas as strings das transições têm realmente apenas um símbolo
    if (δ.some(t => !(isSimbolo(t[1]) && isSimbolo(t[3]))))
      throw new Error("Os símbolos das funções de transição devem conter apenas um caracter!")

    this._Q = Q
    this._δ = δ
    this._q0 = q0
    this._qA = qA
    this._qR = qR

    this._Γ = ''
    this._Σ = ''

    this._tick = 1
    this._status = "Não iniciada"
    this._fita = {
      conteudo: '',
      estadoAtual: this._q0,
      cabecote: 0
    }

    this.controlador = controlador

    this.controlador.construirMaquinaTuring({
      Q: this._Q,
      Σ: this._Σ,
      Γ: this._Γ,
      δ: this._δ,
      q0: this._q0,
      qA: this._qA,
      qR: this._qR
    })
  }

  pausar() {
    this._status = "Pausada"
    this.controlador.pausarComputacao()
  }

  reinicializar() {
    this._fita.conteudo = this._palavraEntrada
    this._fita.cabecote = 0
    this._fita.estadoAtual = this._q0

    this._status = "Não iniciada"

    this.controlador.reinicializarMaquinaTuring()
  }

  inicializar(w: string, t?: Tick) {
    this._palavraEntrada = w
    this._fita.conteudo = w
    this._fita.cabecote = 0
    this._fita.estadoAtual = this._q0

    // O alfabeto de entrada é o conjunto de símbolos que aparecem na entrada
    this._Σ = [... new Set(this._palavraEntrada)].sort().join('')

    // O alfabeto da fita é reinicializado, sendo a concatenação do albabeto de entrada com símbolos que aparecem nas regras de transição e o símbolo em branco
    this._Γ = [...new Set(
      this._Σ.split('')
        .concat(this._δ.flatMap(([e1, s1, e2, s2]) => [s1, s2]))
        .concat(' ')
    )].sort().join('')

    this._status = "Não iniciada"
    
    this.controlador.inicializarMaquinaTuring(this._Σ, this._Γ, this._palavraEntrada)

    if (t) this._tick = t
  }

  rodar() {
    if (!this._fita.conteudo)
      throw new Error("Não há palavra de entrada para ser computada!")

    console.log("Rodar executando!")
    
    this._status = "Computando"

    this.controlador.iniciarComputacao()

    const operacao = () => {
      const { conteudo, estadoAtual, cabecote } = this._fita
      const simboloAtual = conteudo[cabecote] ?? ' '

      if (this._status != "Computando")
        return
      
      if (cabecote > 1000)
        throw new Error("A produção ficou muito longa (provavalmente a MT entrou em loop!)")

      if (estadoAtual === this._qA) {
        this._status = "Aceitou"
        this.controlador.finalizarComputacao(this._status)
        return
      }

      if (estadoAtual === this._qR) {
        this._status = "Rejeitou, estado de rejeição"
        this.controlador.finalizarComputacao(this._status)
        return
      }

      const transicao = this._δ.find(t => t[0] === estadoAtual && t[1] === simboloAtual)
      if (!transicao) {
        this._status = "Rejeitou por indefinição"
        this.controlador.finalizarComputacao(this._status)
        return
      }

      const [, , estDestino, simbEscrita, mov] = transicao

      // console.log(`Movimento da transicao: ${mov}`)
      // console.log(`Simbolo de escrita: ${simbEscrita}`)

      // Atualizar o conteúdo da fita
      this._fita.conteudo = this._fita.conteudo.slice(0, cabecote)
        + simbEscrita
        + this._fita.conteudo.slice(cabecote + 1)

      // Atualizar o estado atual
      this._fita.estadoAtual = estDestino

      // Atualizar pos. do cabeçote
      if (mov === "Direita")
        this._fita.cabecote = cabecote + 1
      else if (mov === "Esquerda")
        this._fita.cabecote = cabecote - 1 <= 0 ? 0 : cabecote - 1
      
      this.controlador.aplicarTransicao(transicao)

      // console.log("conteudo: " + conteudo)

      setTimeout(() => operacao(), 1000 / this._tick)
    }

    operacao()
  }

  mudarTick(tick: Tick) {
    this.controlador.alterarTick(tick)
    this._tick = tick
  }

  get Q(): Estado[] {
    return this._Q;
  }

  get Σ() {
    return this._Σ
  }

  get Γ(): Alfabeto {
    return this._Γ;
  }

  get δ(): Transicao[] {
    return this._δ;
  }

  get q0(): Estado {
    return this._q0;
  }

  get qA(): Estado {
    return this._qA;
  }

  get qR(): Estado {
    return this._qR;
  }

  get palavraEntrada(): string {
    return this._palavraEntrada
  }

  get tick(): Tick {
    return this._tick
  }

}