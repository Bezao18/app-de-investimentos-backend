# App de Investimentos Backend - Processo Seletivo XP

Esse projeto consiste em uma API REST que retornaria informações para o front-end. Dentre elas estão compra e venda de ativos, saques, depósitos
e qualquer outra operação que um cliente poderia executar em um aplicativo financeiro.

<details>
  <summary><strong>Tecnologias utilizadas:</strong></summary><br />
  <ul> 
    <li>Typescript</li>
    <li>Sequelize</li>
    <li>Express</li>
    <li>Docker</li>
    <li>Bcrypt</li>
    <li>Json Web Token</li>
    <li>Mocha</li>
    <li>Chai</li>
  </ul>
</details>

<details>
  <summary><strong>Como rodar a aplicação:</strong></summary><br />
 Como a aplicação utiliza um banco de dados local será necessário rodar um container Docker com uma imagem MySQL para conseguir realizar as requisições.
 <br>
 - Primeiro rode <code>npm install</code> para instalar as dependências
 <br>
 - Seguido de  <code>docker-compose up</code> para rodar o MySQL na porta 3306 e <code>npm run db:reset</code> para criar o banco de dados.
 <br>
 - E por útilmo  <code>npm start</code> para rodar a aplicação.
 <hr>
 A API rodará na porta 3000 por padrão mas pode ser definida no .env como PORT.
 Caso já tenha MySQL localmente na máquina, poderá utilizá-lo criando um .env passando os valores 
 para as seguintes variáveis: DB_USERNAME, DB_PASSWORD,  DB_HOST, DB_PORT.
 <hr>
 ⚠️Lembre-se de deixar as portas 3000 e 3306 vagas caso optar por não criar um arquivo .env⚠️
 
</details>

## Processo de desenvolvimento
<ul>
  <li>O primeiro passo que foi tomado foi interpretar o desafio e elaborar como os dados seriam organizados de acordo com as informações que eram       pedidas. 
  Foram consideradas as entidades: Ativos, Clientes, Ordens e Transações. E foram estabelecidas relações entre elas visando alcançar a normalização
  das tabelas, tendo em consideração que um aplicativo de investimentos precisaria manter um histórico da atividade dos clientes e ao mesmo tempo ter uma
  boa performance em escalas maiores. Como esse projeto apresenta uma escala menor, a performance não foi o foco dessa organização.</li>
  <img alt="Diagrama do banco de dados" src="./images/Diagrama-DB.png"/>
  <br>
  <li>O próximo passo foi interpretar as rotas e os retornos esperados do desafio. Em alguns momentos houve um pouco de ambiguidade no que era pedido e por isso foram tomadas algumas liberdades com relação às rotas. Em um caso real a comunicação com o cliente ou P.O. resolveria essa situação, facilitando desenvolver a aplicação da forma mais próxima do desejado. </li>
</ul>
<details><summary><h2>Rotas</h2></summary><br />
  <details>
  <summary><strong>Rota GET /ativos</strong></summary><br />
    Essa rota retorna todos os ativos disponíveis na corretora. Valor é a sua cotação atual e QtdeAtivo é a quantidade disponível na corretora.
    <br>
    <img alt="Rota GET /ativos" src="./images/GET-ativos.png"/>
  </details>
  <details>
  <summary><strong>Rota GET /ativos/:CodAtivo</strong></summary><br />
     Essa rota retorna apenas o ativo com o CodAtivo selecionado. Valor é a sua cotação atual e QtdeAtivo é a quantidade disponível na corretora.
        <br>
     <img alt="Rota GET /ativos/:CodAtivo" src="./images/GET-ativos-:CodAtivo.png"/>
  </details>
  <details>
  <summary><strong>Rota GET /ativos/cliente/:CodCliente</strong></summary><br />
     Essa rota retorna todos ativos na carteira do cliente com o CodCliente selecionado. Valor é a sua cotação atual e QtdeAtivo é a quantidade desse ativo que o cliente possui em sua carteira.
    <br>
     <img alt="Rota GET /ativos/cliente/:CodCliente" src="./images/GET-ativos-cliente-:CodCliente.png"/>
    <hr>
     ⚠️Essa rota foi feita desse jeito pois /ativos/:CodCliente conflitaria com a rota /ativos/:CodAtivo. Uma outra solução pensada foi usar query parameters, mas para evitar erros de digitação do endpoint, foi feita a rota /ativos/cliente/:CodCliente⚠️
  </details>
  <details>
  <summary><strong>Rota GET /conta/:CodCliente</strong></summary><br />
     Essa rota retorna os dados da conta com o CodCliente selecionado.
    <br>
    <img alt="Rota GET /conta/:CodCliente" src="./images/GET-conta-:CodCliente.png"/>
  </details>
  <details>
  <summary><strong>Rota GET /conta/:CodCliente/ordens</strong></summary><br />
     Essa rota retorna o histórico de ordens de compra e venda do cliente com o CodCliente selecionado. QtdeAtivo é 
    quantidade vendida ou comprada nessa ordem e o ValorDaOrdem é a cotação do ativo no momento em que a ordem foi executada
    (ou seja, é o valor de uma unidade do ativo).
    <br>
    <img alt="Rota GET /conta/:CodCliente/ordens" src="./images/GET-conta-:CodCliente-ordens.png"/>
  </details>
  <details>
  <summary><strong>Rota GET /conta/:CodCliente/transacoes</strong></summary><br />
     Essa rota retorna o histórico de transações do cliente com o CodCliente selecionado.
    <br>
    <img alt="Rota GET /conta/:CodCliente/transacoes" src="./images/GET-conta-:CodCliente-transacoes.png"/>
  </details>
  <details>
  <summary><strong>Rota POST /conta/saque</strong></summary><br />
     Essa rota envia uma requisição de saque para a conta do cliente selecionado. Ela requer um body no seguinte formato:
    <br>
    <code>
      {
    "CodCliente": 1,
    "Valor": 100
      }
    </code>
    <br>
    Será retornada a mensagem "Saque de R${Valor} feito com sucesso" caso a requisição tenha sido válida, ou uma mensagem de erro caso seja inválida
    ou não siga uma das regras de negócio.
  </details>
  <details>
  <summary><strong>Rota POST /conta/deposito</strong></summary><br />
     Essa rota envia uma requisição de depósito para a conta do cliente selecionado. Ela requer um body no seguinte formato:
    <br>
    <code>
      {
    "CodCliente": 1,
    "Valor": 100
      }
    </code>
    <br>
    Será retornada a mensagem "Depósito de R${Valor} feito com sucesso" caso a requisição tenha sido válida, ou uma mensagem de erro caso seja inválida
    ou não siga uma das regras de negócio.
  </details>
  <details>
  <summary><strong>Rota POST /investimentos/comprar</strong></summary><br />
    Essa rota envia uma requisição de compra de ativos para a conta do cliente selecionado. Ela requer um body no seguinte formato:
    <br>
    <code>
      {
      "CodCliente": 1,
      "CodAtivo": 1,
      "QtdeAtivo": 10
      }
    </code>
    <br>
    Será retornada a mensagem "Ordem de compra executada com sucesso" caso a requisição tenha sido válida, ou uma mensagem de erro caso seja inválida
    ou não siga uma das regras de negócio.
  </details>
  <details>
  <summary><strong>Rota POST /investimentos/vender</strong></summary><br />
     Essa rota envia uma requisição de venda de ativos para a conta do cliente selecionado. Ela requer um body no seguinte formato:
    <br>
    <code>
      {
      "CodCliente": 1,
      "CodAtivo": 1,
      "QtdeAtivo": 10
      }
    </code>
    <br>
    Será retornada a mensagem "Ordem de venda executada com sucesso" caso a requisição tenha sido válida, ou uma mensagem de erro caso seja inválida
    ou não siga uma das regras de negócio.
  </details>
  <details>
  <summary><strong>Rota POST /cadastro</strong></summary><br />
    Essa rota envia uma requisição para cadastrar uma conta nova. Ela requer um body no seguinte formato:
    <br>
    <code>
      {
        "Email": "test@email.com",
        "Senha": "abcdef"
      }
    </code>
    <br>
    Será retornado um token de validação que expirará em 15 minutos caso a requisição tenha sido válida, ou uma mensagem de erro caso seja inválida
    ou não siga uma das regras de negócio.
     <hr>
    ⚠️O token seria utilizado para proteger algumas rotas, mas não houve tempo para implementa-lo corretamente⚠️
  </details>
  <details>
  <summary><strong>Rota POST /login</strong></summary><br />
     Essa rota envia uma requisição para fazer login em uma conta existente. Ela requer um body no seguinte formato:
    <br>
    <code>
      {
        "Email": "silviosantos@email.com",
        "Senha": "abcdef"
      }
    </code>
    <br>
    Será retornado um token de validação que expirará em 15 minutos caso a requisição tenha sido válida, ou uma mensagem de erro caso seja inválida
    ou não siga uma das regras de negócio.
    <hr>
    ⚠️O token seria utilizado para proteger algumas rotas, mas não houve tempo para implementa-lo corretamente⚠️
  </details>
</details>
<ul>
  <li></li>
</ul>





