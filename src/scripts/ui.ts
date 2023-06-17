function calcularNovaPosicao(element: HTMLElement, mvValue: number) {
  const transformValue = getComputedStyle(element).getPropertyValue("transform")
  const currentPos = new DOMMatrixReadOnly(transformValue).m41
  const newPos = currentPos + mvValue
  return newPos
}

export function moverCabecoteDireita(fita: HTMLElement) {
  fita.style.transform = `translateX(${calcularNovaPosicao(fita, -60)}px)`
}

export function moverCabecoteEsquerda(fita: HTMLUListElement) {
  fita.style.transform = `translateX(${calcularNovaPosicao(fita, 60)}px)`
} 

export function preencherCelulasMT(ulFita: HTMLUListElement, posAtual: number, conteudo: string) {
  ulFita.innerHTML = ''
  let left24Elements: HTMLLIElement[] = []
  let i = 0, c = posAtual
  while (i < 24) {
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
  i = 0, c = posAtual + 1
  while (i < 24) {
    const novaCelula = document.createElement("li")
    novaCelula.classList.add("celula")
    novaCelula.innerText = conteudo[c] || ' '

    right24Elements.push(novaCelula)

    c++;
    i++;
  }

  const totalElements = left24Elements.concat(right24Elements)
  totalElements.forEach(elem => ulFita.appendChild(elem))
}