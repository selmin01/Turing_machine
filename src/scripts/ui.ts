import { IControladorMaquina, Parada, Tick, Transicao } from "../logic/MaquinaTuring"

export default class ControladorUIFita {
  private _fita: HTMLUListElement
  private _posPx: number
  private _tick: Tick = 1
  private _celulaAtual: HTMLLIElement
  private _conteudo: string = ''
  private _posAtual: number = 0
  private _posAnterior: number = 0
  private _qtdTransicoesParaAtualizacao: number = 0
  private _qtdElementsEachSide = 64

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
    setTimeout(() => {
      this._fita.style.transform = `translateX(${this._posPx + qtd * 60}px)`
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

  private obterPosicaoAtual(): number {
    const transformValue = getComputedStyle(this._fita).getPropertyValue("transform")
    const currentPos = new DOMMatrixReadOnly(transformValue).m41
    return currentPos
  }

  constructor(fita: HTMLUListElement) {
    this._fita = fita
    this._fita.style.transitionDuration = `${(1000 / this._tick) * 0.75}ms`
    this._posPx = this.obterPosicaoAtual()
    
    this._celulaAtual = this.preencherCelulas()
  } 

  get p() { return this._posPx }

  iniciarMaquinaTuring(w: string): void {
    this._conteudo = w
    this._celulaAtual = this.preencherCelulas()
  }

  aplicarTransicao(t: Transicao): void {
    const [,,, simbEscrita, mov] = t

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
  
  }

  finalizarComputacao(p: Parada) {
    console.log("Parou!")
  }

  alterarTick(t: Tick) {
    this._tick = t
    const tickTime = (1000 / t) * 0.75
    this._fita.style.transitionDuration = `${tickTime}ms`
  }
}
