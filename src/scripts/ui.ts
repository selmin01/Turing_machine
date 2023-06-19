import { Tick } from "../logic/MaquinaTuring"

function calcTransitionDuration(tick: Tick) {
  return (1000 / tick) * 0.75
}

function obterPosicaoAtual(element: HTMLElement) {
  const transformValue = getComputedStyle(element).getPropertyValue("transform")
  const currentPos = new DOMMatrixReadOnly(transformValue).m41
  return currentPos
}

export function moverCabecoteDireita(fita: HTMLElement) {
  setTimeout(() => {
    fita.style.transform = `translateX(${obterPosicaoAtual(fita) - 60}px)`
  }, 10)
}

export function moverCabecoteEsquerda(fita: HTMLUListElement) {
  setTimeout(() => {
    fita.style.transform = `translateX(${obterPosicaoAtual(fita) + 60}px)`
  }, 10)
}

export function falsoMovimentoAEsquerda(fita: HTMLUListElement, tick: Tick) {
  setTimeout(() => {
    const posicaoAtual = obterPosicaoAtual(fita)
    fita.style.transform = `translateX(${posicaoAtual + 32}px)`
    setTimeout(() => {
      fita.style.transform = `translateX(${posicaoAtual}px)`
    }, (1000 / tick) * 0.2)
  }, 10)
}

export function animarTransicaoCelula(celula: HTMLLIElement, tick: number) {
  setTimeout(() => {
    celula.style.transitionDuration = '0ms'
    celula.style.color = "#3498db"
    setTimeout(() => {
      celula.style.transitionDuration = `${(1000 / tick) * 0.2}ms`
      celula.style.color = "#111414"
    }, (1000 / tick) * 0.2)
  }, 10)
}

function corrigirTransition(fita: HTMLUListElement, qtd: number) {
  const previousTransitionDuration = fita.style.transitionDuration
  fita.style.transitionDuration = '0s'
  const posicaoAtual = obterPosicaoAtual(fita)
  fita.style.transform = `translateX(${posicaoAtual + qtd * 60}px)`
  setTimeout(() => {
    fita.style.transitionDuration = previousTransitionDuration
  }, 1)
} 

export function preencherCelulasMT(
  ulFita: HTMLUListElement,
  conteudo: string,
  [posAtual, posAnterior]: [number, number],
): HTMLLIElement {
  const qtdElementsEachSide = 64
  ulFita.innerHTML = ''
  let left24Elements: HTMLLIElement[] = []
  let i = 0, c = posAtual - 1
  while (i < qtdElementsEachSide) {
    if (c < 0) break

    const novaCelula = document.createElement("li")
    novaCelula.classList.add("celula")
    if (c == 0) novaCelula.id = "primeira-celula"
    novaCelula.innerText = conteudo[c] || ' '

    left24Elements.push(novaCelula)

    c--
    i++
  }

  const dist = Math.abs(posAtual - posAnterior)
  const maxPos = Math.max(posAnterior, posAtual)
  const minPos = Math.min(posAnterior, posAtual)
  let qtdCorrecaoTransition = dist
    - (
      Math.min(maxPos, qtdElementsEachSide)
    - Math.min(minPos, qtdElementsEachSide)
    )
  if (posAtual < posAnterior) qtdCorrecaoTransition *= -1
  corrigirTransition(ulFita, qtdCorrecaoTransition)
  console.log("posAtual: " + posAtual + ", posAnterior: " + posAnterior)
  console.log("Deslocamento calculado: " + qtdCorrecaoTransition)
  // c++

  // if (posAtual > qtdElementsEachSide) {
  //   corrigirTransition(ulFita, )
  // }

  // if (c > 0) {
  //   const qtd = c <= qtdElementsEachSide - 1 ? c : qtdElementsEachSide - 1
  //   console.log("Transition corrigida! Numero de celulas deslocadas: " + qtd)
  //   corrigirTransition(ulFita, qtd)
  // }

  left24Elements.reverse()

  const celulaAtual: HTMLLIElement = document.createElement("li")
  celulaAtual.classList.add("celula")
  celulaAtual.innerText = conteudo[posAtual] || ' ' 

  left24Elements.push(celulaAtual)

  let right24Elements: HTMLLIElement[] = []
  i = 0, c = posAtual + 1
  while (i < qtdElementsEachSide) {
    const novaCelula = document.createElement("li")
    novaCelula.classList.add("celula")
    novaCelula.innerText = conteudo[c] || ' '

    right24Elements.push(novaCelula)

    c++;
    i++;
  }

  const totalElements = left24Elements.concat(right24Elements)
  totalElements.forEach(elem => ulFita.appendChild(elem))

  return celulaAtual
}