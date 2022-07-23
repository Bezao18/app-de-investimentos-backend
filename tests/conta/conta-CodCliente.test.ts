import chai from 'chai'
import chaiHttp from 'chai-http';
import { before } from 'mocha';
import app from '../../src/app';
import { IClient } from '../../src/interfaces';
import HTTPErrorMessage from '../../src/utils/HTTPErrorMessage';


chai.use(chaiHttp);
const { expect } = chai;

describe('Testa a rota GET /conta/:CodCliente', () => {
  let body: IClient;
  let status: number;

  describe('Quando é passado o CodCliente de um cliente existente', () => {
    before(async () => {
      const response = await chai.request(app).get('/conta/1')
      status = response.status;
      body = response.body;
    })
    it('A requisição retorna o status 200', () => {
      expect(status).to.be.equal(200);
    });
    it('A requisição retorna um objeto', () => {
      expect(body).to.be.an('object');
    });
    it('O objeto retornado possui apenas as chaves "CodCliente", "Email" e "Saldo"', () => {
      expect(body).to.include.all.keys("CodCliente", "Email", "Saldo");
    });
  })

  describe('Quando é passado o CodCliente de um cliente que não existe', () => {
    let body: HTTPErrorMessage;
    before(async () => {
      const response = await chai.request(app).get('/conta/200')
      status = response.status;
      body = response.body;
    })
    it('A requisição retorna o status 404', () => {
      expect(status).to.be.equal(404);
    });
    it('A requisição retorna a mensagem "Esse cliente não existe"', () => {
      expect(body.message).to.be.equal("Esse cliente não existe");
    });
  })

  describe('Quando é passado um parâmetro que não é um número', () => {
    let body: HTTPErrorMessage;
    before(async () => {
      const response = await chai.request(app).get('/conta/teste')
      status = response.status;
      body = response.body;
    })
    it('A requisição retorna o status 404', () => {
      expect(status).to.be.equal(404);
    });
    it('A requisição retorna a mensagem "Essa rota está incorreta"', () => {
      expect(body.message).to.be.equal("Essa rota está incorreta");
    });
  })
})


