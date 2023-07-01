type IconProps = {
  path: string
  viewBox: [number, number, number, number]
}

export default class Icons {
  private static _defaultIconSize: number = 32

  private static _settingsIcon: IconProps = {
    path: "m388-80-20-126q-19-7-40-19t-37-25l-118 54-93-164 108-79q-2-9-2.5-20.5T185-480q0-9 .5-20.5T188-521L80-600l93-164 118 54q16-13 37-25t40-18l20-127h184l20 126q19 7 40.5 18.5T669-710l118-54 93 164-108 77q2 10 2.5 21.5t.5 21.5q0 10-.5 21t-2.5 21l108 78-93 164-118-54q-16 13-36.5 25.5T592-206L572-80H388Zm92-270q54 0 92-38t38-92q0-54-38-92t-92-38q-54 0-92 38t-38 92q0 54 38 92t92 38Zm0-60q-29 0-49.5-20.5T410-480q0-29 20.5-49.5T480-550q29 0 49.5 20.5T550-480q0 29-20.5 49.5T480-410Zm0-70Zm-44 340h88l14-112q33-8 62.5-25t53.5-41l106 46 40-72-94-69q4-17 6.5-33.5T715-480q0-17-2-33.5t-7-33.5l94-69-40-72-106 46q-23-26-52-43.5T538-708l-14-112h-88l-14 112q-34 7-63.5 24T306-642l-106-46-40 72 94 69q-4 17-6.5 33.5T245-480q0 17 2.5 33.5T254-413l-94 69 40 72 106-46q24 24 53.5 41t62.5 25l14 112Z",
    viewBox: [0, -960, 960, 960]
  }
  
  private static _playIcon: IconProps = {
    path: "M320-202v-560l440 280-440 280Z",
    viewBox: [0, -960, 960, 960]
  }
  
  private static _pauseIcon: IconProps = {
    path: "M556.667-200v-560h170v560h-170Zm-323.334 0v-560h170v560h-170Z",
    viewBox: [0, -960, 960, 960]
  }
  
  private static _resetIcon: IconProps = {
    path: "M480-100.001q-70.769 0-132.615-26.462-61.846-26.461-108.153-72.769-46.308-46.307-72.769-108.153Q140.001-369.231 140.001-440h45.384q0 122.692 85.961 208.654Q357.308-145.385 480-145.385t208.654-85.961Q774.615-317.308 774.615-440t-84.038-208.654q-84.039-85.961-206.731-85.961h-23.385l71.846 71.461-31.383 31.615L373.54-759.307l128.153-127.768 31.384 31L457-779.999h23q70.769 0 132.615 26.462 61.846 26.461 108.153 72.769 46.308 46.307 72.769 108.153Q819.999-510.769 819.999-440t-26.462 132.615q-26.461 61.846-72.769 108.153-46.307 46.308-108.153 72.769Q550.769-100.001 480-100.001Z",
    viewBox: [0, -960, 960, 960]
  }
  
  private static _fastForwardIcon: IconProps = {
    path: "M134.771-267.694v-424.612L443.076-480 134.771-267.694Zm382.768 0v-424.612L825.844-480 517.539-267.694Z",
    viewBox: [0, -960, 960, 960]
  }
  
  private static _fastRewindIcon: IconProps = {
    path: "M823.613-267.694 515.308-480l308.305-212.306v424.612Zm-378.921 0L136.387-480l308.305-212.306v424.612Z",
    viewBox: [0, -960, 960, 960]
  }

  private static _closeIcon: IconProps = {
    path: "m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z",
    viewBox: [0, -960, 960, 960] 
  }
  
  private static generateElementFromString(componentString: string): Element {
    const tempContainer = document.createElement("div")
    tempContainer.innerHTML = componentString 

    if (tempContainer.children.length <= 0 || !tempContainer.firstElementChild)
      throw new Error("Invalid component string provided to generate an element.")
    
    const component = tempContainer.firstElementChild
    tempContainer.removeChild(component)
    return component
  }

  private static createIconComponent(props: IconProps, size: number, fill?: string): Element {
    const { path, viewBox } = props

    const iconString = `
      <svg
        height="${size}"
        width="${size}"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="${viewBox[0]} ${viewBox[1]} ${viewBox[2]} ${viewBox[3]}" 
      >
        <path fill="${fill ?? '#black'}" d="${props.path}"/>
      </svg>
    `

    return this.generateElementFromString(iconString)
  }

  static settingsIcon(size?: number, fill?: string) {
    return this.createIconComponent(
      this._settingsIcon,
      size ?? this._defaultIconSize,
      fill
    )
  }
  static playIcon(size?: number, fill?: string) {
    return this.createIconComponent(
      this._playIcon,
      size ?? this._defaultIconSize,
      fill
    )
  }
  static pauseIcon(size?: number, fill?: string) {
    return this.createIconComponent(
      this._pauseIcon,
      size ?? this._defaultIconSize,
      fill
    )
  }
  static resetIcon(size?: number, fill?: string) {
    return this.createIconComponent(
      this._resetIcon,
      size ?? this._defaultIconSize,
      fill
    )
  }
  static fastForwardIcon(size?: number, fill?: string) {
    return this.createIconComponent(
      this._fastForwardIcon,
      size ?? this._defaultIconSize,
      fill
    )
  }
  static fastRewindIcon(size?: number, fill?: string) {
    return this.createIconComponent(
      this._fastRewindIcon,
      size ?? this._defaultIconSize,
      fill
    )
  }
  static closeIcon(size?: number, fill?: string) {
    return this.createIconComponent(
      this._closeIcon,
      size ?? this._defaultIconSize,
      fill
    )
  }
}