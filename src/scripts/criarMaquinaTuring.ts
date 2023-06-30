import MaquinaTuring, { IControladorMaquina, IEntradaMT } from "./logic/MaquinaTuring"
import ControladorUIMT, { IElementosComEstado } from "./display/ControladorUIMT"
import ElementosDeSaida from "./display/ElementosDeSaida"
import ElementosDeEntrada from "./display/ElementosDeEntrada"

export default function criarMaquinaTuring(dados: IEntradaMT): void {
  const controlador = new ControladorUIMT(new ElementosDeSaida())

  const mt = new MaquinaTuring(dados, controlador)
  console.log("MAQUINA DE TURING CRIADA:")
  console.log(mt)

  new ElementosDeEntrada(mt)
}