const fita: HTMLUListElement = document.getElementById("fita") as HTMLUListElement
const moveToRight: HTMLButtonElement = document.getElementById("moveToRight") as HTMLButtonElement
const moveToLeft: HTMLButtonElement = document.getElementById("moveToLeft") as HTMLButtonElement

fita.style.transition = "transform 0.3s ease"

function getTranslateX(element: HTMLElement) {
  const transformValue = window.getComputedStyle(element).getPropertyValue("transform")
  const matrix = new DOMMatrixReadOnly(transformValue)
  return matrix.m41
}

function movToRight(element: HTMLElement, mvValue: number) {
  const currentPos = getTranslateX(element)
  const newPos = currentPos + mvValue
  console.log(currentPos)
  console.log(newPos)
  element.style.transform = `translateX(${newPos}px)`
}

if (fita && moveToRight && moveToLeft) {
  moveToRight.addEventListener("click", () => movToRight(fita, 64))
  moveToLeft.addEventListener("click", () => movToRight(fita, -64))
}
