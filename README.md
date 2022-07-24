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
- O primeiro passo que foi tomado foi interpretar o desafio e elaborar como os dados seriam organizados de acordo com as informações que eram pedidas. 
Foram consideradas as entidades: Ativos, Clientes, Ordens e Transações. E foram estabelecidas relações entre elas visando alcançar a normalização
das tabelas, tendo em consideração que um aplicativo de investimentos precisaria manter um histórico da atividade dos clientes e ao mesmo tempo ter uma
boa performance em escalas maiores. Como esse projeto apresenta uma escala menor, a performance não foi o foco dessa organização.
<img alt="Diagrama do banco de dados" src="./images/Diagrama-DB.png"/>






