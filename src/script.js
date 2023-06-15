const fita = document.getElementById("fita")
const button = document.getElementById("moveButton")

console.log(button)
console.log(fita)

function getTranslateX(elem) {
  const transformValue = window.getComputedStyle(elem).getPropertyValue("transform")
  const matrix = new DOMMatrixReadOnly(transformValue)
  return matrix.m41
}

function movDireita(elem, mvValue) {
  const currentPos = getTranslateX(elem)
  elem.style.transform = `translateX(${currentPos + mvValue})`
}

button.addEventListener("click", movDireita(fita, 32))