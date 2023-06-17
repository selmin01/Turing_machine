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
export type Fita = [string, Estado, number] // Conteúdo da fita, Estado atual, posição do cabeçote
export interface IAtualizacaoMaquina {
  aplicarTransicao: (f: Fita, t: Transicao) => void
  finalizarComputacao: (p: Parada) => void
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
  private atualizacao: IAtualizacaoMaquina

  constructor(dados: IDadosMaquinaTuring, cb: IAtualizacaoMaquina) {
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
    this._fita = ['', this._q_0, 0]

    this.atualizacao = cb
  }

  resetar() {
    this._Γ = [...new Set(this._δ.flatMap(([i1, s1, i2, s2]) => [s1, s2]))]
      .concat(' ')
      .sort()
      .join('')
    this._Σ = ''

    this._tick = 1
    this._fita = ['', this._q_0, 0]
    this._status = "Não iniciada"
  }

  pausar() {
    this._status = "Pausada"
  }

  rodar(w: string) {
    console.log("Rodar executando!")
    
    this._Σ = [... new Set(w)].sort().join('')
    this._Γ = [...new Set(this._Γ.concat(this._Σ))].sort().join('')

    this._fita[0] = w

    this._status = "Computando"

    const operacao = () => {
      const [conteudoFita, estadoAtual, cabecote] = this._fita
      const simboloAtual = conteudoFita[cabecote]

      // console.log("Computando...")
      // console.log("Conteudo da fita: ")
      // console.log(conteudoFita)
      // console.log("Estado atual: ")
      // console.log(estadoAtual)
      // console.log(`Posicao atual do cabecote: ${cabecote}`)

      if (this._status != "Computando")
        return

      if (estadoAtual === this._q_aceita) {
        this._status = "Aceitou"
        this.atualizacao.finalizarComputacao(this._status)
        return
      }

      if (estadoAtual === this._q_rejeita) {
        this._status = "Rejeitou, estado de rejeição"
        this.atualizacao.finalizarComputacao(this._status)
        return
      }

      const transicao = this._δ.find(t => t[0] === estadoAtual && t[1] === simboloAtual)
      if (!transicao) {
        this._status = "Rejeitou por indefinição"
        this.atualizacao.finalizarComputacao(this._status)
        return
      }

      const [, , estDestino, simbEscrita, mov] = transicao

      // console.log(`Movimento da transicao: ${mov}`)
      // console.log(`Simbolo de escrita: ${simbEscrita}`)

      // Atualizar o conteúdo da fita
      const novoConteudoFita = conteudoFita.split('')
      novoConteudoFita[cabecote] = simbEscrita
      this._fita[0] = novoConteudoFita.join('')

      // Atualizar o estado atual
      this._fita[1] = estDestino

      // Atualizar pos. do cabeçote
      if (mov === "Direita")
        this._fita[2] = cabecote + 1
      else if (mov === "Esquerda")
        this._fita[2] = cabecote - 1 <= 0 ? 0 : cabecote - 1
      
      this.atualizacao.aplicarTransicao(this._fita, transicao)

      setTimeout(() => operacao(), 1000 / this._tick)
    }

    operacao()
  }

  mudarTick(tick: Tick) {
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