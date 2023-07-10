# Turing Machine Simulator

### Summary

- [Context of the project](#context-of-the-project)
- [What is the project](#what-is-the-project)
- [What does it do](#what-does-it-do)
- [How does it work](#how-does-it-work)
- [How to use it](#how-to-use-it)

## <a id="context-of-the-project"></a>Context of the project

This repository contains a project that was developed by [Pedro Fernandes](https://github.com/peedrofernandes) and [Gabriel Anselmo](https://github.com/selmin01) during the **Computer Theory** subject of the **Bachelor at Computer Science** course at the [University of State of Santa Catarina - Center of Technological Sciences (UDESC-CCT)](https://www.udesc.br/cct) in June 2023.

## <a id="what-is-the-project"></a>What is the project

The project consists in a web application that simulates a standard **Turing Machine**. More details on who is **Alan Turing**, what is a **Turing Machine** an some other important information can be found in the [application deploy itself](https://peedrofernandes.github.io/turing-machine).

Basically, students of the **Computer Theory** subject can use this app to specify their own Turing Machine and understand complex concepts, such as **Computability**, **Decidability of problems** and others. Since Turing Machines are primitive, theoretical versions of digital computers, create a Turing Machine with totally custom specifications is equivalent to **create a computer program** that executes a very specific task.

## <a id="what-does-it-do"></a>What does it do

The application allow the user to specify its Turing Machine. After that, the user can test, verify and run its own created machine and see if the expected results were achieved. The application can also deal with a variety of possible errors that the user can make when creating its machine.

## <a id="how does it work"></a>How does it work

This application was developed using plain TypeScript, HTML5 and CSS3, bundled with WebPack to optimize performance and browser compatibility. Some tools were used, such as SASS and BootStrap, but no web framework was used.

## <a id="how-to-use-it"></a>How to use it

There are two ways that you can use this application - You can either run the online version of it - available at [peedrofernandes.github.io/turing-machine](https://peedrofernandes.github.io/turing-machine) or you can either clone this repository or download it's ZIP and run on your local machine. Instructions on how to effectively build your Turing Machine are in the app.

To run this project locally, you'll need **node.js** and **npm** installed. After you guarantee that, navigate to the source directory of the project you downloaded and follow theese steps:

- Run `npm install`;
- Run `npm run dev`;

![Imagem resultado de exemplo](src//assets/img/Captura%20de%20Tela.png)

