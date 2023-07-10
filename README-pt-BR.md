[🇺🇸 🇬🇧 View in English](https://github.com/selmin01/Turing_machine/blob/main/README.md)

# Simulador de Máquina de Turing

### Sumário

- [Contexto do projeto](#context-of-the-project)
- [O que é o projeto](#what-is-the-project)
- [O que o projeto faz](#what-does-it-do)
- [Como funciona](#how-does-it-work)
- [Como usar](#how-to-use-it)

## <a id="context-of-the-project"></a>Contexto do projeto

Esse repositório é referente a um projeto desenvolvido por [Pedro Fernandes](https://github.com/peedrofernandes) e [Gabriel Anselmo](https://github.com/selmin01) durante a matéria de **Teoria da Computação** no curso de **Bacharelado em Ciência da Computação** na [Universidade do Estado de Santa Catarina - Centro de Ciências Tecnológicas (UDESC-CCT)](https://www.udesc.br/cct) em Junho de 2023.


## <a id="what-is-the-project"></a>O que é o projeto

O projeto consiste em uma aplicação web que simula a versão padrão de uma **Máquina de Turing**. Informações adicionais, como por exemplol quem é **Alan Turing** e o que é uma **Máquina de Turing** podem ser encontradas no [deploy da aplicação](https://peedrofernandes.github.io/turing-machine).

Basicamente, o projeto permite que estudantes que se interessam pelo assunto de **Teoria da Computação** criem e especifiquem suas próprias versões da Máquina de Turing, podendo dessa forma compreender conceitos complexos como **Computabilidade**, **Decidibilidade de problemas**, dentre outros. Como Máquinas de Turing são versões primitivas e teoréticas que dão origem ao conceito atual de computador digital, criar uma Máquina de Turing totalmente personalizável é equivalente a **criar um programa de computador** que executa tarefas bastante específicas.

## <a id="what-does-it-do"></a>O que o projeto faz

A aplicação permite que o usuário crie e veja o funcionamento de uma Máquina de Turing de forma totalmente independente. Além disso, a aplicação consegue lidar com uma variedade ampla de possíveis erros que o usuário pode cometer ao criar sua Máquina de Turing.

## <a id="how does it work"></a>How does it work

A aplicação foi desenvolvida usando TypeScript, HTML5 e CSS3 e entregada com WebPack para otimizar a performance e compatibilidade entre navegadores. Algumas ferramentas foram utilizadas, como SASS e BootStrap, mas nenhum framework web foi utilizado.

## <a id="how-to-use-it"></a>Como usar

Há dois jeitos de usar a aplicação - Você pode ou simplesmente usar a versão online, disponível em [peedrofernandes.github.io/turing-machine](https://peedrofernandes.github.io/turing-machine) ou você pode trazer os arquivos desse repositório para a sua máquina local e rodar localmente, seja por meio de um clone ou de um downoad do ZIP. Instruções a respeito de como você pode efetivamente construir e testar a sua Máquina de Turing estão disponíveis no app.

Para rodar este projeto na sua máquina local, você vai precisar do **node.js** instalado - que já vem junto com o gerenciador de pacotes **npm**. Você pode usar outro gerenciador de pacotes node se preferir, mas no exemplo usaremos o próprio npm. Quando você tiver tanto com o node.js instalado quanto com os arquivos do projeto na sua máquina, navegue ao diretório-fonte e faça o seguinte:

- Execute `npm install`
- Execute `npm run dev`
- Veja o projeto rodando [na sua máquina, na porta 3000](https://localhost:3000).

![Imagem resultado de exemplo](src//assets/img/Captura%20de%20Tela.png)

