import Icons from "./icons"

type ErrorComponent = {
  li: HTMLLIElement
  bar: HTMLDivElement
  text: string
  spanContent: HTMLSpanElement
  currentTransformY: number
}

export default class ErrorHandler {
  private static _instance?: ErrorHandler

  private ulErrors: HTMLUListElement
  private currentShownErrors: ErrorComponent[]

  private createErrorComponent (text: string): ErrorComponent {
    const li = document.createElement("li")
    li.classList.add("error-message")

    const spanContent = document.createElement("span")
    spanContent.textContent = text

    const spanCloseIcon = document.createElement("span")
    spanCloseIcon.appendChild(Icons.closeIcon(20, "#fafafa"))
    spanCloseIcon.classList.add("close")

    const bar = document.createElement("div")
    bar.classList.add("error-message-bar")

    li.appendChild(spanCloseIcon)
    li.appendChild(spanContent)
    li.appendChild(bar)

    const errorComponent: ErrorComponent = {
      li,
      bar,
      text,
      spanContent,
      currentTransformY: 0
    }
    spanCloseIcon.addEventListener("click", () => this.removeError(errorComponent))
    return errorComponent
  }

  private pushNewError(errorComponent: ErrorComponent) {
    // Empurra todos os elementos existentes pra cima para caber o novo elemento
    const diff = parseInt(getComputedStyle(errorComponent.li).height) + 12
    this.currentShownErrors.forEach(error => {
      error.currentTransformY -= diff
      error.li.style.transform = `translateY(${error.currentTransformY}px)`
    })
    
    this.currentShownErrors.push(errorComponent)

    console.log(this.currentShownErrors.length)
  }

  private removeError(errorComponent: ErrorComponent) {
    const index = this.currentShownErrors.indexOf(errorComponent)

    if (index == -1) {
      console.log("Index not found!")
    }
      
    setTimeout(() => {
      errorComponent.li.style.opacity = '0'

      const diff = parseInt(getComputedStyle(errorComponent.li).height) + 12
      this.currentShownErrors.slice(0, index).forEach(error => {
        error.currentTransformY += diff
        error.li.style.transform = `translateY(${error.currentTransformY}px)`
      })

      this.currentShownErrors.splice(index, 1)

      setTimeout(() => {
        errorComponent.li.remove()
      }, 250)
    }, 0)
  }

  private constructor() {
    const ulErrors: HTMLUListElement | null =
      document.querySelector("#errors-container")
    if (!ulErrors) throw new Error("Lista de erros não encontrada na DOM.")

    this.ulErrors = ulErrors
    this.currentShownErrors = []
  }

  static get instance(): ErrorHandler {
    if (!ErrorHandler._instance) {
      ErrorHandler._instance = new ErrorHandler()
    }

    return ErrorHandler._instance
  }

  showError(message: string) {
    const newError = this.createErrorComponent(message)
    this.ulErrors.appendChild(newError.li)

    setTimeout(() => {
      newError.li.style.opacity = '1'
      
      this.pushNewError(newError)
      
      let barCurrentValue = 100
      const intervalCode = setInterval(() => {
        newError.bar.style.width = `${barCurrentValue -= 0.25}%`
        if (barCurrentValue <= 0) {
          clearInterval(intervalCode)
          newError.li.style.opacity = '0'
          setTimeout(() => {
            newError.li.remove()
            this.currentShownErrors.shift()
          }, 250)
        }
      }, 25)

    }, 0)
  }
}