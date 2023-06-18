function obterPosicaoAtual(element: HTMLElement) {
  const transformValue = getComputedStyle(element).getPropertyValue("transform")
  const currentPos = new DOMMatrixReadOnly(transformValue).m41
  return currentPos
}

export function moverCabecoteDireita(fita: HTMLElement) {
  fita.style.transform = `translateX(${obterPosicaoAtual(fita) - 60}px)`
}

export function moverCabecoteEsquerda(fita: HTMLUListElement) {
  fita.style.transform = `translateX(${obterPosicaoAtual(fita) + 60}px)`
}

export function falsoMovimentoAEsquerda(fita: HTMLUListElement, tick: number) {
  const posicaoAtual = obterPosicaoAtual(fita)
  fita.style.transform = `translateX(${posicaoAtual + 32}px)`
  setTimeout(() => {
    fita.style.transform = `translateX(${posicaoAtual}px)`
  }, (1000 / tick) * 0.2)
}

export function animarTransicaoCelula(celula: HTMLLIElement, tick: number) {
  celula.style.transitionDuration = '0ms'
  celula.style.color = "#3498db"
  setTimeout(() => {
    celula.style.transitionDuration = `${(1000 / tick) * 0.2}ms`
    celula.style.color = "#111414"
  }, (1000 / tick) * 0.2)

}

export function preencherCelulasMT(ulFita: HTMLUListElement, posAtual: number, conteudo: string): HTMLLIElement {
  const qtdElemendsEachSide = 48

  let celulaAtual: HTMLLIElement | null = null
  ulFita.innerHTML = ''
  let left24Elements: HTMLLIElement[] = []
  let i = 0, c = posAtual - 1
  while (i < qtdElemendsEachSide) {
    if (c < 0) break

    const novaCelula = document.createElement("li")
    novaCelula.classList.add("celula")
    if (c == 0) novaCelula.id = "primeira-celula"
    novaCelula.innerText = conteudo[c] || ' '

    left24Elements.push(novaCelula)

    c--
    i++
  }
  left24Elements.reverse()

  let right24Elements: HTMLLIElement[] = []
  i = 0, c = posAtual
  while (i < qtdElemendsEachSide) {
    const novaCelula = document.createElement("li")
    novaCelula.classList.add("celula")
    novaCelula.innerText = conteudo[c] || ' '

    if (c == posAtual)
      celulaAtual = novaCelula

    right24Elements.push(novaCelula)

    c++;
    i++;
  }

  if (!celulaAtual) throw new Error("Erro na logica de preenchimento de celulas!")

  const totalElements = left24Elements.concat(right24Elements)
  totalElements.forEach(elem => ulFita.appendChild(elem))

  return celulaAtual
}