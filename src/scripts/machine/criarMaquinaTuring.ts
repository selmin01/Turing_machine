import MaquinaTuring, { IControladorMaquina, IEntradaMT } from "./logic/MaquinaTuring"
import ControladorUIMT, { IElementosComEstado } from "./display/ControladorUIMT"
import ElementosDeSaida from "./display/ElementosDeSaida"
import ElementosDeEntrada from "./display/ElementosDeEntrada"
import ErrorHandler from "../components/ErrorHandler"

export default function criarMaquinaTuring(dados: IEntradaMT): void {
  const controlador = new ControladorUIMT(new ElementosDeSaida())

  const mt = new MaquinaTuring(dados, controlador)
  new ElementosDeEntrada(mt)
}