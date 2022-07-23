import chai from 'chai'
import chaiHttp from 'chai-http';
import { before } from 'mocha';
import app from '../../src/app';
import { IClient } from '../../src/interfaces';
import { validateJWT } from '../../src/utils/JWT';
import resetDatabase from '../utils/resetDatabase';
import dotenv from 'dotenv';
const { Cliente } = require('../../src/database/models');

chai.use(chaiHttp);
dotenv.config();
const { expect } = chai;


describe('Testa a rota POST /cadastro', () => {
  let body: any;
  let status: number;
  let reqBody: IClient;

  describe('Enviando um body com Email e Senha válidos', () => {
    before(async () => {
      resetDatabase();
      reqBody = { Email: 'teste@email.com', Senha: 'password' }
      const response = await chai.request(app).post('/cadastro').send(reqBody);
      status = response.status;
      body = response.body;
    })
    it('A requisição retorna o status 200', () => {
      expect(status).to.be.equal(200);
    });

    it('A requisição retorna um objeto com um token válido', () => {
      expect(body).to.be.an('object');
      const { Email } = validateJWT(body.token)
      expect(Email).to.be.equal(reqBody.Email);
    });

    it('O cliente é inserido no banco de dados', async () => {
      const client = await Cliente.findOne({ where: { Email: reqBody.Email } })
      expect(client).to.not.equal(null)
    })
  })

  describe('Enviando um body com Email inválido', () => {
    before(async () => {
      reqBody = { Email: 'email.com', Senha: 'password' }
      const response = await chai.request(app).post('/cadastro').send(reqBody);
      status = response.status;
      body = response.body;
    })

    it('A requisição retorna o status 400', () => {
      expect(status).to.be.equal(400);
    });

    it('A requisição retorna a mensagem "Email inválido"', () => {
      expect(body.message).to.be.equal("Email inválido");
    });
  })

  describe('Enviando um body com Senha inválida', () => {
    before(async () => {
      reqBody = { Email: 'teste@email.com', Senha: 'senha' }
      const response = await chai.request(app).post('/cadastro').send(reqBody);
      status = response.status;
      body = response.body;
    })

    it('A requisição retorna o status 400', () => {
      expect(status).to.be.equal(400);
    });

    it('A requisição retorna a mensagem "O campo Senha precisa ter pelo menos 6 caracteres"', () => {
      expect(body.message).to.be.equal("O campo Senha precisa ter pelo menos 6 caracteres");
    });
  })

  describe('Enviando um body sem Email', () => {
    before(async () => {
      reqBody = { Senha: 'senha' }
      const response = await chai.request(app).post('/cadastro').send(reqBody);
      status = response.status;
      body = response.body;
    })
    it('A requisição retorna o status 400', () => {
      expect(status).to.be.equal(400);
    });

    it('A requisição retorna a mensagem "O campo Email é obrigatório"', () => {
      expect(body.message).to.be.equal("O campo Email é obrigatório");
    });
  })

  describe('Enviando um body sem Senha', () => {
    before(async () => {
      reqBody = { Email: 'teste@email.com' }
      const response = await chai.request(app).post('/cadastro').send(reqBody);
      status = response.status;
      body = response.body;
    })
    it('A requisição retorna o status 400', () => {
      expect(status).to.be.equal(400);
    });

    it('A requisição retorna a mensagem "O campo Senha é obrigatório"', () => {
      expect(body.message).to.be.equal("O campo Senha é obrigatório");
    });
  })

  describe('Enviando um body com um Email já existente', () => {
    before(async () => {
      reqBody = { Email: 'silviosantos@email.com', Senha: 'password' }
      const response = await chai.request(app).post('/cadastro').send(reqBody);
      status = response.status;
      body = response.body;
    })
    it('A requisição retorna o status 409', () => {
      expect(status).to.be.equal(409);
    });

    it('A requisição retorna a mensagem "Já existe um cliente com esse Email"', () => {
      expect(body.message).to.be.equal("Já existe um cliente com esse Email");
    });
  })

})
