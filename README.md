# euvoudoar

O projeto euvoudoar.com.br é uma iniciativa filantrópica, cujo objetivo é aproximar as entidades que necessitam de doações do mundo virtual, facilitando o gerenciamento de pagamentos via cartão de crétido e Pix para tais instituições.

## Estrutura deste repositório

O repositório está estruturado nas seguintes pastas:

* `code`: onde é armazenado todo o código fonte da aplicação (front-end e back-end)
* `docs`: diretório para armazenamento de arquivos contendo instruções sobre o projeto, informações úteis, apresentações, etc.

## Gerência de configuração neste projeto

Todos os desenvolvedores devem seguir as instruções de uso. Elas garantem a consistência de código entre os ambientes local e de produção.

As branches padrão para este repositório são:

* **main**: contém o código fonte de produção. Utilizará a branch `develop` para ser atualizada.

* **develop**: branch que acomoda a cópia mais recente do trabalho desenvolvido e testado pelos desenvolvedores. Esta é a branch na qual o desenvolvedor irá criar sua própria branch, e é o destino para o qual o desenvolvedor deverá fazer o merge da sua tarefa finalizada.

## Estrutura da API

* `institutions`: gerenciamento do status e dados das instituições

* `donations`: configuração da doação (ex.: definição da instituição, valor, recorrência, etc.)

* `payments`: processamento de pagamentos utilizando um gateway qualquer

* `withdraws`: recebimentos das quantias pelas instituições