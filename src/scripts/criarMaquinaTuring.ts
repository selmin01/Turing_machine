import MaquinaTuring, { IControladorMaquina, IEntradaMT } from "./machine/logic/MaquinaTuring"
import ControladorUIMT, { IElementosComEstado } from "./machine/display/ControladorUIMT"
import ElementosDeSaida from "./machine/display/ElementosDeSaida"
import ElementosDeEntrada from "./machine/display/ElementosDeEntrada"

export default function criarMaquinaTuring(dados: IEntradaMT): void {
  const controlador = new ControladorUIMT(new ElementosDeSaida())

  const mt = new MaquinaTuring(dados, controlador)
  console.log("MAQUINA DE TURING CRIADA:")
  console.log(mt)

  new ElementosDeEntrada(mt)
}