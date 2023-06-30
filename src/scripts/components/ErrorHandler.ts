type ErrorComponent = {
  li: HTMLLIElement
  bar: HTMLDivElement
  text: string
  currentTransformY: number
}

export default class ErrorHandler {
  private static _instance?: ErrorHandler

  private ulErrors: HTMLUListElement
  private currentShownErrors: ErrorComponent[]

  private createErrorComponent (text: string): ErrorComponent {
    const li = document.createElement("li")
    li.classList.add("error-message")
    const span = document.createElement("span")
    span.textContent = text
    const bar = document.createElement("div")
    bar.classList.add("error-message-bar")
    li.appendChild(span)
    li.appendChild(bar)

    return { li, bar, text, currentTransformY: 0 }
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
      
      this.currentShownErrors.forEach(error => {
        const diff = parseInt(getComputedStyle(error.li).height) + 12
        error.currentTransformY -= diff
        error.li.style.transform = `translateY(${error.currentTransformY}px)`
      })
      
      this.currentShownErrors.push(newError)
      console.log(this.currentShownErrors)
      console.log(this.ulErrors)
      
      let barCurrentValue = 100
      const intervalCode = setInterval(() => {
        newError.bar.style.width = `${barCurrentValue -= 0.25}%`
        if (barCurrentValue <= 0) {
          clearInterval(intervalCode)
          newError.li.style.opacity = '0'
          setTimeout(() => {
            newError.li.remove()
            this.currentShownErrors.shift()
          }, 1000)
        }
      }, 10)

    }, 0)
  }
}