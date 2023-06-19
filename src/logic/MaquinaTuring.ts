export type Estado = string
export type Movimento = "Esquerda" | "Direita"
export type Alfabeto = string
export type Simbolo = string
export type Transicao = [Estado, Simbolo, Estado, Simbolo, Movimento]
export type Tick = 1 | 1.25 | 1.5 | 1.75 | 2 | 4 | 8 | 16
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
export interface IControladorMaquina {
  iniciarMaquinaTuring: (w: string) => void
  aplicarTransicao: (t: Transicao) => void
  finalizarComputacao: (p: Parada) => void
  alterarTick: (t: Tick) => void
}

const isSimbolo = (str: string): str is Simbolo => /^.$/.test(str)

export interface IDadosMaquinaTuring {
  Q: Estado[],
  δ: Transicao[],
  q_0: Estado,
  q_aceita: Estado
  q_rejeita: Estado
}

export default class MaquinaTuring {
  private _Q: Estado[]
  private _Σ: Alfabeto
  private _Γ: Alfabeto
  private _δ: Transicao[]
  private _q_0: Estado
  private _q_aceita: Estado
  private _q_rejeita: Estado

  private _tick: Tick
  private _status: StatusMaquina
  private _fita: Fita
  private controlador: IControladorMaquina

  constructor(dados: IDadosMaquinaTuring, controlador: IControladorMaquina) {
    const { Q, δ, q_0, q_aceita, q_rejeita } = dados

    // Verifica se estados possuem espaço no nome
    if (Q.some(estado => estado.includes(" ")))
      throw new Error("Nomes de estados não podem ter espaço!")

    // Verifica se existem estados com o mesmo nome
    if (new Set(Q).size !== Q.length)
      throw new Error("Estados devem ter nomes diferentes!")
    
    // Verifica se os três estados especiais estão contidos no conjunto de estados
    if (!(Q.includes(q_0) && Q.includes(q_aceita) && Q.includes(q_rejeita)))
      throw new Error("Os estados iniciais, de aceitação e de rejeição devem estar contidos no conjunto de estados!")
    
    // Verifica se os estados de aceitação e rejeição são diferentes
    if (!(q_aceita !== q_rejeita))
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
    this._q_0 = q_0
    this._q_aceita = q_aceita
    this._q_rejeita = q_rejeita

    this._Γ = [...new Set(this._δ.flatMap(([i1, s1, i2, s2]) => [s1, s2]))]
      .concat(' ')
      .sort()
      .join('')
    this._Σ = ''

    this._tick = 1
    this._status = "Não iniciada"
    this._fita = {
      conteudo: '',
      estadoAtual: this.q_0,
      cabecote: 0
    }

    this.controlador = controlador
  }

  resetar() {
    this._Γ = [...new Set(this._δ.flatMap(([i1, s1, i2, s2]) => [s1, s2]))]
      .concat(' ')
      .sort()
      .join('')
    this._Σ = ''

    this._tick = 1
    this._fita = {
      conteudo: '',
      estadoAtual: this.q_0,
      cabecote: 0
    }
    this._status = "Não iniciada"
  }

  pausar() {
    this._status = "Pausada"
  }

  iniciar(w: string, t?: Tick) {
    this._fita.conteudo = w
    this._Σ = [... new Set(this._fita.conteudo)].sort().join('')
    this._Γ = [...new Set(this._Γ.concat(this._Σ))].sort().join('')
    this.controlador.iniciarMaquinaTuring(w)

    if (t) this._tick = t
  }

  rodar() {
    if (!this._fita.conteudo)
      throw new Error("Não há palavra de entrada para ser computada!")

    console.log("Rodar executando!")
    
    this._status = "Computando"

    const operacao = () => {
      const { conteudo, estadoAtual, cabecote } = this._fita
      const simboloAtual = conteudo[cabecote] ?? ' '

      // console.log("Computando...")
      // console.log("Estado atual: ")
      // console.log(estadoAtual)
      // console.log(`Posicao atual do cabecote: ${cabecote}`)

      if (this._status != "Computando")
        return
      
      if (cabecote > 1000)
        throw new Error("A produção ficou muito longa (provavalmente a MT entrou em loop!)")

      if (estadoAtual === this._q_aceita) {
        this._status = "Aceitou"
        this.controlador.finalizarComputacao(this._status)
        return
      }

      if (estadoAtual === this._q_rejeita) {
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

  get q_0(): Estado {
    return this._q_0;
  }

  get q_aceita(): Estado {
    return this._q_aceita;
  }

  get q_rejeita(): Estado {
    return this._q_rejeita;
  }

}