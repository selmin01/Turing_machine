import { IEntradaMT } from "./logic/MaquinaTuring";
import criarMaquinaTuring from "./criarMaquinaTuring";

const mockDadosMaquina: IEntradaMT = {
  δ: [
    ["q0", "0", "q0", "1", "Direita"], // Stay in q0 and write 1, move right
    ["q0", "1", "q0", "0", "Direita"], // Stay in q0 and write 0, move right
    ["q0", " ", "q_rejeita", "1", "Esquerda"], // Move to q1 and write 1, move left
    ["q1", "0", "q2", "1", "Esquerda"], // Move to q2 and write 1, move left
    ["q1", "1", "q1", "0", "Esquerda"], // Stay in q1 and write 0, move left
    ["q2", "0", "q2", "0", "Esquerda"], // Stay in q2 and write 0, move left
    ["q2", "1", "q2", "1", "Esquerda"], // Stay in q2 and write 1, move left
    ["q2", " ", "q3", "1", "Direita"], // Move to q3 and write 1, move right
    ["q3", "0", "q3", "0", "Direita"], // Stay in q3 and write 0, move right
    ["q3", "1", "q3", "1", "Direita"], // Stay in q3 and write 1, move right
    ["q3", " ", "q4", " ", "Esquerda"], // Move to q4, write blank, stop
  ],
  q0: "q0",
  qA: "q4",
  qR: "q_rejeita",
};

try {
  const data: string | null = localStorage.getItem("entradaMT")
  if (!data) {
    window.location.href = "/"
    throw new Error("Dados de entrada não identificados.")
  }
  const entradaMT: IEntradaMT = JSON.parse(data)
  criarMaquinaTuring(entradaMT)
} catch (error) {
  window.location.href = "/"
  console.log(error)
}