import { Alfabeto, Estado, IControladorMaquina, IDadosMaquinaTuring, Parada, Tick, Transicao } from "../logic/MaquinaTuring"

type Cor = "preto"
  | "cinza"
  | "vermelho"
  | "azul"
  | "verde"
  | "amarelo"

export interface IElementos {
  fita: HTMLUListElement
  spanEstadoAtual: HTMLSpanElement
  spanTransicaoAtual: HTMLSpanElement
  spanSituacaoAtual: HTMLSpanElement
  spanAlfabetoEntrada: HTMLSpanElement
  spanAlfabetoFita: HTMLSpanElement
  spanConjEstados: HTMLSpanElement
  ulTransicoes: HTMLUListElement
}

export default class ControladorUIFita implements IControladorMaquina {
  private _dadosMT?: IDadosMaquinaTuring

  private _fita: HTMLUListElement
  private _spanEstadoAtual: HTMLSpanElement
  private _spanTransicaoAtual: HTMLSpanElement
  private _spanSituacaoAtual: HTMLSpanElement
  private _spanAlfabetoEntrada: HTMLSpanElement
  private _spanAlfabetoFita: HTMLSpanElement
  private _spanConjEstados: HTMLSpanElement
  private _ulTransicoes: HTMLSpanElement

  private _posPx: number = 0
  private _tick: Tick = 1
  private _celulaAtual: HTMLLIElement
  private _conteudo: string = ''
  private _posAtual: number = 0
  private _posAnterior: number = 0
  private _qtdTransicoesParaAtualizacao: number = 0
  private _qtdElementsEachSide = 64

  private _palavraEntrada: string = ''
  private _estadoInicial: Estado = ''

  private direita() {
    this._posPx -= 60
    setTimeout(() => {
      this._fita.style.transform = `translateX(${this._posPx}px)`
    }, 10)
  }

  private esquerda() {
    this._posPx += 60
    setTimeout(() => {
      this._fita.style.transform = `translateX(${this._posPx}px)`
    }, 10)
  }

  private falsoMovEsquerda() {
    this._fita.style.transform = `translateX(${this._posPx + 32}px)`
    setTimeout(() => {
      this._fita.style.transform = `translateX(${this._posPx}px)`
    }, (1000 / this._tick) * 0.2)
  }

  private corrigirTranslate() {
    // Calcular quantidade de células deslocadas
    const dist = Math.abs(this._posAtual - this._posAnterior)
    const maxPos = Math.max(this._posAnterior, this._posAtual)
    const minPos = Math.min(this._posAnterior, this._posAtual)
    let qtd = dist
      - (
        Math.min(maxPos, this._qtdElementsEachSide)
      - Math.min(minPos, this._qtdElementsEachSide)
      )
    if (this._posAtual < this._posAnterior)
      qtd *= -1

    // Aplicar correção
    const previousTransitionDuration = this._fita.style.transitionDuration
    this._fita.style.transitionDuration = '0s'
    this._posPx += qtd * 60

    console.log("CORREÇÃO DA FITA!!!")
    console.log(`posPx: ${this._posPx}`)

    setTimeout(() => {
      this._fita.style.transform = `translateX(${this._posPx}px)`
      this._fita.style.transitionDuration = previousTransitionDuration
    }, 1)
  } 

  private preencherCelulas(): HTMLLIElement {
    this._fita.innerHTML = ''
    let leftElements: HTMLLIElement[] = []
    let i = 0, c = this._posAtual - 1
    while (i < this._qtdElementsEachSide) {
      if (c < 0) break
      const novaCelula = document.createElement("li")
      novaCelula.classList.add("celula")
      if (c == 0) novaCelula.id = "primeira-celula"
      novaCelula.innerText = this._conteudo[c] || ' '
      leftElements.push(novaCelula)
      c--
      i++
    }

    this.corrigirTranslate()
  
    leftElements.reverse()
  
    const celulaAtual: HTMLLIElement = document.createElement("li")
    celulaAtual.classList.add("celula")
    celulaAtual.innerText = this._conteudo[this._posAtual] || ' ' 
  
    leftElements.push(celulaAtual)
  
    let rightElements: HTMLLIElement[] = []
    i = 0, c = this._posAtual + 1
    while (i < this._qtdElementsEachSide) {
      const novaCelula = document.createElement("li")
      novaCelula.classList.add("celula")
      novaCelula.innerText = this._conteudo[c] || ' '
      rightElements.push(novaCelula)
      c++;
      i++;
    }
  
    const totalElements = leftElements.concat(rightElements)
    totalElements.forEach(elem => this._fita.appendChild(elem))
  
    return celulaAtual
  }

  private animarTransicaoCelula(celula: HTMLLIElement) {
    setTimeout(() => {
      celula.style.transitionDuration = '0ms'
      celula.style.color = "#3498db"
      setTimeout(() => {
        celula.style.transitionDuration = `${(1000 / this._tick) * 0.2}ms`
        celula.style.color = "#111414"
      }, (1000 / this._tick) * 0.2)
    }, 10)
  }

  private setCor(element: HTMLElement, cor: Cor) {
    element.className = element.className.replace(/(^|\s)cor-\w+/g, "").trim()
    element.classList.add(`cor-${cor}`)
  }

  constructor(elementos: IElementos) {
    this._fita = elementos.fita
    this._spanEstadoAtual = elementos.spanEstadoAtual
    this._spanSituacaoAtual = elementos.spanSituacaoAtual
    this._spanTransicaoAtual = elementos.spanTransicaoAtual
    this._spanAlfabetoEntrada = elementos.spanAlfabetoEntrada
    this._spanAlfabetoFita = elementos.spanAlfabetoFita
    this._spanConjEstados = elementos.spanConjEstados
    this._ulTransicoes = elementos.ulTransicoes

    this._fita.style.transitionDuration = `${(1000 / this._tick) * 0.75}ms`
    
    this._celulaAtual = this.preencherCelulas()
  } 

  get p() { return this._posPx }

  construirMaquinaTuring(dadosMT: IDadosMaquinaTuring) {
    const { Q, Σ, Γ, δ, q0, qA, qR } = dadosMT
    // Os alfabetos Σ e Γ serão inferidos no momento da inicialização 
  
    this._spanConjEstados.innerText = `{'${Q.join("', '")}'}`

    
    this._ulTransicoes.innerHTML = ""
    const liElements = δ.map(
      ([e1, s1, e2, s2, mov]) => {
        const li = document.createElement("li")
        li.innerText = `δ ('${e1}', '${s1}') = ('${e2}', '${s2}', '${mov}')`
        return li
      }
      ).sort()
      liElements.forEach(li => this._ulTransicoes.appendChild(li))
      
    this._estadoInicial = q0
  } 

  inicializarMaquinaTuring(Σ: Alfabeto, Γ: Alfabeto, w: string): void {
    this._palavraEntrada = w

    this._spanAlfabetoEntrada.innerText = `{'${Σ.split('').join("', '")}'}`
    this._spanAlfabetoFita.innerText = `{'${Γ.split('').join("', '")}'}`

    this.reinicializarMaquinaTuring()
  }

  reinicializarMaquinaTuring(): void {
    this._posAtual = 0
    this._posAnterior = 0
    this._conteudo = this._palavraEntrada
    this._posPx = 0
    this._celulaAtual = this.preencherCelulas()

    this.setCor(this._spanEstadoAtual, "azul")
    this.setCor(this._spanTransicaoAtual, "azul")
    this.setCor(this._fita, "preto")

    this.setCor(this._spanSituacaoAtual, "amarelo")
    this._spanSituacaoAtual.innerText = "Aguardando"

    this.setCor(this._spanEstadoAtual, "azul")
    this._spanEstadoAtual.innerText = this._estadoInicial || "N/A"

    this.setCor(this._spanTransicaoAtual, "cinza")
    this._spanTransicaoAtual.innerText = "N/A"
  }

  iniciarComputacao() {
    this.setCor(this._spanSituacaoAtual, "verde")
    this._spanSituacaoAtual.innerText = "Computando"
  }

  pausarComputacao() {
    this.setCor(this._spanSituacaoAtual, "amarelo")
    this._spanSituacaoAtual.innerText = "Pausado"
  }

  aplicarTransicao(t: Transicao): void {
    const [estadoOrigem, simbLeitura, estadoDestino, simbEscrita, mov] = t

    this._conteudo = this._conteudo.slice(0, this._posAtual)
      + simbEscrita
      + this._conteudo.slice(this._posAtual + 1)
    
      this._celulaAtual.innerText = simbEscrita

    if (mov === "Direita") {
      this.direita()
      this.animarTransicaoCelula(this._celulaAtual)
      this._celulaAtual = this._celulaAtual.nextElementSibling as HTMLLIElement
      this._posAtual++
    } else {
      const celulaAnterior = this._celulaAtual.previousElementSibling as HTMLLIElement
      if (celulaAnterior) {
        this.esquerda()
        this.animarTransicaoCelula(this._celulaAtual)
        this._celulaAtual = celulaAnterior
        this._posAtual--
      } else {
        this.falsoMovEsquerda()
        this.animarTransicaoCelula(this._celulaAtual)
      }
    }

    this._qtdTransicoesParaAtualizacao++
    if (this._qtdTransicoesParaAtualizacao > 32) {
      this._celulaAtual = this.preencherCelulas()
      this._posAnterior = this._posAtual
      this._qtdTransicoesParaAtualizacao = 0
    }

    

    this._spanEstadoAtual.innerText = estadoDestino

    this._spanTransicaoAtual.innerText = `δ(${estadoOrigem}, '${simbLeitura}') = (${estadoDestino}, '${simbEscrita}', ${mov})`
  }

  finalizarComputacao(p: Parada) {
    switch (p) {
      case "Aceitou":
        this.setCor(this._spanSituacaoAtual, "verde")
        this.setCor(this._fita, "verde")
        break
      default:
        this.setCor(this._spanSituacaoAtual, "vermelho")
        this.setCor(this._fita, "vermelho")
        break
    }
      this._spanSituacaoAtual.innerText = p
  }

  alterarTick(t: Tick) {
    this._tick = t
    const tickTime = (1000 / t) * 0.75
    this._fita.style.transitionDuration = `${tickTime}ms`
  }
}
