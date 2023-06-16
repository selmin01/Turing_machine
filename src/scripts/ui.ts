export function moverParaDireita(element: HTMLElement, mvValue: number) {
  // get current TranslateX value
  const transformValue = window.getComputedStyle(element).getPropertyValue("transform")
  const matrix = new DOMMatrixReadOnly(transformValue)

  // Apply transformation
  const currentPos = matrix.m41
  const newPos = currentPos + mvValue
  console.log(currentPos)
  console.log(newPos)
  element.style.transform = `translateX(${newPos}px)`
}

export function preencherCelulasMT(elemFita: HTMLUListElement, posAtual: number, conteudo: string) {
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
  totalElements.forEach(elem => elemFita.appendChild(elem))
}