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


describe('Testa a rota POST /login', () => {
  let body: any;
  let status: number;
  let reqBody: IClient;

  describe('Enviando um body com Email e Senha corretos', () => {
    before(async () => {
      reqBody = { Email: 'silviosantos@email.com', Senha: 'abcdef' }
      const response = await chai.request(app).post('/login').send(reqBody);
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

  })

  describe('Enviando um body com Email incorreto', () => {
    before(async () => {
      resetDatabase()
      reqBody = { Email: 'aaaaaa@email.com', Senha: 'password' }
      const response = await chai.request(app).post('/login').send(reqBody);
      status = response.status;
      body = response.body;
    })

    it('A requisição retorna o status 400', () => {
      expect(status).to.be.equal(400);
    });

    it('A requisição retorna a mensagem "Dados inválidos"', () => {
      expect(body.message).to.be.equal("Dados inválidos");
    });
  })

  describe('Enviando um body com Senha incorreta', () => {
    before(async () => {
      reqBody = { Email: 'silviosantos@email.com', Senha: 'password' }
      const response = await chai.request(app).post('/login').send(reqBody);
      status = response.status;
      body = response.body;
    })

    it('A requisição retorna o status 400', () => {
      expect(status).to.be.equal(400);
    });

    it('A requisição retorna a mensagem "Dados inválidos"', () => {
      expect(body.message).to.be.equal("Dados inválidos");
    });
  })

  describe('Enviando um body sem Email', () => {
    before(async () => {
      reqBody = { Senha: 'senha' }
      const response = await chai.request(app).post('/login').send(reqBody);
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
      const response = await chai.request(app).post('/login').send(reqBody);
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

})
