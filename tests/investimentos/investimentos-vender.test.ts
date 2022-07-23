import chai from 'chai'
import chaiHttp from 'chai-http';
import { before, after } from 'mocha';
import app from '../../src/app';
import resetDatabase from '../utils/resetDatabase';
import dotenv from 'dotenv';

chai.use(chaiHttp);
dotenv.config();
const { expect } = chai;


describe('Testa a rota POST /investimentos/vender', () => {
  let body: any;
  let status: number;
  let reqBody: any;

  describe('Enviando um body com valores válidos', () => {
    before(async () => {
      resetDatabase()
      reqBody = { CodCliente: 1, CodAtivo: 1, QtdeAtivo: 100 }
      const response = await chai.request(app).post('/investimentos/vender').send(reqBody);
      status = response.status;
      body = response.body;
    })

    after(() => {
      resetDatabase()
    })

    it('A requisição retorna o status 200', () => {
      expect(status).to.be.equal(200);
    });

    it('A requisição retorna a mensagem "Ordem de venda executada com sucesso"', () => {
      expect(body).to.be.a('string');
      expect(body).to.be.equal('Ordem de venda executada com sucesso');
    });

  })

  describe('Enviando um body com QtdeAtivo inválida', () => {
    before(async () => {
      reqBody = { CodCliente: 1, CodAtivo: 1, QtdeAtivo: -1 }
      const response = await chai.request(app).post('/investimentos/vender').send(reqBody);
      status = response.status;
      body = response.body;
    })

    it('A requisição retorna o status 400', () => {
      expect(status).to.be.equal(400);
    });

    it('A requisição retorna a mensagem "Não é possivel vender uma quantidade negativa ou igual a zero"', () => {
      expect(body.message).to.be.equal("Não é possivel vender uma quantidade negativa ou igual a zero");
    });
  })

  describe('Enviando um body com QtdeAtivo maior que a Qtde de ativos do cliente', () => {
    before(async () => {
      reqBody = { CodCliente: 1, CodAtivo: 1, QtdeAtivo: 1000000000000 }
      const response = await chai.request(app).post('/investimentos/vender').send(reqBody);
      status = response.status;
      body = response.body;
    })

    it('A requisição retorna o status 400', () => {
      expect(status).to.be.equal(400);
    });

    it('A requisição retorna a mensagem "Ativos insuficientes para essa operação"', () => {
      expect(body.message).to.be.equal("Ativos insuficientes para essa operação");
    });
  })

  describe('Enviando um body com CodAtivo inválido', () => {
    before(async () => {
      reqBody = { CodCliente: 1, CodAtivo: 0, QtdeAtivo: 100 }
      const response = await chai.request(app).post('/investimentos/vender').send(reqBody);
      status = response.status;
      body = response.body;
    })

    it('A requisição retorna o status 404', () => {
      expect(status).to.be.equal(404);
    });

    it('A requisição retorna a mensagem "Esse ativo não existe"', () => {
      expect(body.message).to.be.equal("Esse ativo não existe");
    });
  })

  describe('Enviando um body com CodCliente inválido', () => {
    before(async () => {
      reqBody = { CodCliente: 0, CodAtivo: 1, QtdeAtivo: 100 }
      const response = await chai.request(app).post('/investimentos/vender').send(reqBody);
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

  describe('Enviando um body sem CodCliente', () => {
    before(async () => {
      reqBody = { CodAtivo: 1, QtdeAtivo: 100 }
      const response = await chai.request(app).post('/investimentos/vender').send(reqBody);
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

  describe('Enviando um body sem QtdeAtivo', () => {
    before(async () => {
      reqBody = { CodAtivo: 1, CodCliente: 1 }
      const response = await chai.request(app).post('/investimentos/vender').send(reqBody);
      status = response.status;
      body = response.body;
    })
    it('A requisição retorna o status 400', () => {
      expect(status).to.be.equal(400);
    });

    it('A requisição retorna a mensagem "O campo QtdeAtivo é obrigatório"', () => {
      expect(body.message).to.be.equal("O campo QtdeAtivo é obrigatório");
    });
  })

  describe('Enviando um body sem CodAtivo', () => {
    before(async () => {
      reqBody = { CodCliente: 1, QtdeAtivo: 100 }
      const response = await chai.request(app).post('/investimentos/vender').send(reqBody);
      status = response.status;
      body = response.body;
    })
    it('A requisição retorna o status 400', () => {
      expect(status).to.be.equal(400);
    });

    it('A requisição retorna a mensagem "O campo CodAtivo é obrigatório"', () => {
      expect(body.message).to.be.equal("O campo CodAtivo é obrigatório");
    });
  })

})
