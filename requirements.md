# O projeto

## Objetivo
Criar uma aplicação web simples e intuitiva capaz de mostrar o funcionamento completo de uma Máquina de Turing convencional, de acordo com as especificações da máquina inseridas pelo usuário.

## Requisitos

### Input dos usuários

Os usuários deverão fornecer como entrada os seguintes dados:

- O conjunto de estados Q - Será fornecido pelo usuário a partir de uma só string, todos os estados separados por vírgulas;
- O conjunto de transições δ: Q x Γ -> Q x Γ x {E, D} - Será fornecido, item a item, da seguinte forma:
  - O estado inicial: Um select cujas opções serão os estados fornecidos em Q;
  - O símbolo de leitura: Apenas um caractere manualmente inserido pelo usuário;
  - O estado de destino: Outro select cujas opções serão os estados fornecidos em Q;
  - O símbolo de escrita: Outro caractere manualmente inserido pelo usuário;
  - A escolha de movimento esquerda/direita: Apenas um select com duas opções;
- Os nomes dos três estados q0, q-aceita, q-rejeita - Serão fornecidos pelo usuário através de três selects, cujas opções são os estados fornecidos em Q;
- A palavra de entrada para iniciar a computação, w;

Nota-se que o alfabeto de entrada, Σ, será inferido pelos símbolos da palavra de entrada e o alfabeto da fita será inferido por Σ e pelos símbolos envolvidos nas funções de transição. Com isso, todo o conjunto de elementos de uma máquina de Turing será determinado: (Q, Σ, Γ, δ, q0, q-aceita, q-rejeita)

### Validações de entrada
As validações que precisam ser feitas são:

- Não pode repetir nomes de estados no conjunto de estados Q;
- O nome de cada estado não pode ter espaços;
- Os três estados q0, q-aceita e q-rejeita precisam pertencer ao conjunto definido Q;
- O estado q-aceita precisa ser diferente do estado q-rejeita;
- Não pode ter duas possibilidades para uma mesma transição (de modo que a MT seja determinista);
- Transições devem apenas ter símbolos de um caractere (validação necessária devido ao fato de o TypeScript não ter tipagem para Char)

### O funcionamento da Máquina

Fornecidos os dados a respeito da MT, o programa iniciará com o cabeçote na primeira célula da fita, que já conterá a palavra de entrada. A tela mostrará:
- A fita com o cabeçote;
- Uma seção com o estado atual;
- Uma seção com a transição que está sendo aplicada;
- Uma seção com a situação atual da máquina, que mostrará uma das seguintes possibilidades: Aguardando, computando, aceitou, rejeitou por indefinição, rejeitou por chegada ao estado de aceitação;
- Uma seção com um botão de play para iniciar a computação, botão de pause para pausar e de restart para voltar ao início;
- Um acelerador, para o caso de o usuário querer acelerar a computação.

### As animações

As animações da computação serão simples. O cabeçote vai ficar fixo no meio da tela enquanto a fita se movimenta de acordo com as computações. Ao final de cada movimentação, o estado de cada componente na tela se altera de acordo com as especificações.

