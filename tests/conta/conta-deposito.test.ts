import chai from 'chai'
import chaiHttp from 'chai-http';
import { before, after } from 'mocha';
import app from '../../src/app';
import resetDatabase from '../utils/resetDatabase';
import dotenv from 'dotenv';

chai.use(chaiHttp);
dotenv.config();
const { expect } = chai;


describe('Testa a rota POST /conta/deposito', () => {
  let body: any;
  let status: number;
  let reqBody: any;

  describe('Enviando um body com valores válidos', () => {
    before(async () => {
      resetDatabase()
      reqBody = { CodCliente: 1, Valor: 100 }
      const response = await chai.request(app).post('/conta/deposito').send(reqBody);
      status = response.status;
      body = response.body;
    })

    after(() => {
      resetDatabase()
    })

    it('A requisição retorna o status 200', () => {
      expect(status).to.be.equal(200);
    });

    it(`A requisição retorna a mensagem "Depósito de R$100 feito com sucesso"`, () => {
      expect(body).to.be.equal(`Depósito de R$100 feito com sucesso`);
    });
  })

  describe('Enviando um body com Valor inválido', () => {
    before(async () => {
      reqBody = { CodCliente: 1, Valor: 0 }
      const response = await chai.request(app).post('/conta/deposito').send(reqBody);
      status = response.status;
      body = response.body;
    })

    it('A requisição retorna o status 400', () => {
      expect(status).to.be.equal(400);
    });

    it(`A requisição retorna a mensagem "Não é possível depositar um valor negativo ou igual a zero"`, () => {
      expect(body.message).to.be.equal("Não é possível depositar um valor negativo ou igual a zero");
    });
  })

  describe('Enviando um body sem CodCliente', () => {
    before(async () => {
      reqBody = { Valor: 100 }
      const response = await chai.request(app).post('/conta/deposito').send(reqBody);
      status = response.status;
      body = response.body;
    })
    it('A requisição retorna o status 400', () => {
      expect(status).to.be.equal(400);
    });

    it('A requisição retorna a mensagem "O campo CodCliente é obrigatório"', () => {
      expect(body.message).to.be.equal("O campo CodCliente é obrigatório");
    });
  })

  describe('Enviando um body sem Valor', () => {
    before(async () => {
      reqBody = { CodCliente: 1 }
      const response = await chai.request(app).post('/conta/deposito').send(reqBody);
      status = response.status;
      body = response.body;
    })
    it('A requisição retorna o status 400', () => {
      expect(status).to.be.equal(400);
    });

    it('A requisição retorna a mensagem "O campo Valor é obrigatório"', () => {
      expect(body.message).to.be.equal("O campo Valor é obrigatório");
    });
  })
  
})
