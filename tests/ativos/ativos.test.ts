import chai from 'chai'
import chaiHttp from 'chai-http';
import { before } from 'mocha';
import app from '../../src/app';
import { IAtivo, IPortfolio } from '../../src/interfaces';
import HTTPErrorMessage from '../../src/utils/HTTPErrorMessage';


chai.use(chaiHttp);
const { expect } = chai;

describe('Testa a rota /ativos', () => {
  let body: IAtivo[];
  let status: number;
  before(async () => {
    const response = await chai.request(app).get('/ativos')
    status = response.status;
    body = response.body;
  })
  it('A requisição GET para a rota retorna o status 200', () => {
    expect(status).to.be.equal(200);
  });
  it('A requisição GET para a rota retorna um array de objetos', () => {
    expect(body).to.be.an('array');
    expect(body[0]).to.be.an('object');
  });
  it('Os objetos retornados no array possuem as chaves "CodAtivo", "QtdeAtivo" e "Valor"', () => {
    expect(body[0]).to.include.all.keys("CodAtivo", "QtdeAtivo", "Valor");
  });
})

describe('Testa a rota /ativos/:CodAtivo', () => {
  let body: IAtivo;
  let status: number;
  describe('Quando é passado o CodAtivo de um ativo existente', () => {
    before(async () => {
      const response = await chai.request(app).get('/ativos/1')
      status = response.status;
      body = response.body;
    })
    it('A requisição GET para a rota retorna o status 200', () => {
      expect(status).to.be.equal(200);
    });
    it('A requisição GET para a rota retorna um array de objetos', () => {
      expect(body).to.be.an('object');
    });
    it('O objeto retornado possui as chaves "CodAtivo", "QtdeAtivo" e "Valor"', () => {
      expect(body).to.include.all.keys("CodAtivo", "QtdeAtivo", "Valor");
    });
  })
  describe('Quando é passado o CodAtivo de um ativo que não existe', () => {
    let body: HTTPErrorMessage;
    before(async () => {
      const response = await chai.request(app).get('/ativos/200')
      status = response.status;
      body = response.body;
    })
    it('A requisição GET para a rota retorna o status 404', () => {
      expect(status).to.be.equal(404);
    });
    it('A requisição GET para a rota retorna a mensagem "Esse ativo não existe"', () => {
      expect(body.message).to.be.equal("Esse ativo não existe");
    });
  })

  describe('Quando é passado um parâmetro que não é um número', () => {
    let body: HTTPErrorMessage;
    before(async () => {
      const response = await chai.request(app).get('/ativos/teste')
      status = response.status;
      body = response.body;
    })
    it('A requisição GET para a rota retorna o status 404', () => {
      expect(status).to.be.equal(404);
    });
    it('A requisição GET para a rota retorna a mensagem "Essa rota está incorreta"', () => {
      expect(body.message).to.be.equal("Essa rota está incorreta");
    });
  })
})

describe('Testa a rota /ativos/cliente/:CodCliente', () => {
  let body: IPortfolio[];
  let status: number;
  describe('Quando é passado o CodCliente de um cliente existente', () => {
    before(async () => {
      const response = await chai.request(app).get('/ativos/cliente/1')
      status = response.status;
      body = response.body;
    })
    it('A requisição GET para a rota retorna o status 200', () => {
      expect(status).to.be.equal(200);
    });
    it('A requisição GET para a rota retorna um array de objetos', () => {
      expect(body).to.be.an('array');
      expect(body[0]).to.be.an('object');
    });
    it('O objeto retornado possui as chaves "CodCliente", "CodAtivo", "QtdeAtivo" e "Valor"', () => {
      expect(body[0]).to.include.all.keys("CodCliente", "CodAtivo", "QtdeAtivo", "Valor");
    });
  })
  describe('Quando é passado o CodCliente de um cliente que não existe', () => {
    let body: HTTPErrorMessage;
    before(async () => {
      const response = await chai.request(app).get('/ativos/cliente/200')
      status = response.status;
      body = response.body;
    })
    it('A requisição GET para a rota retorna o status 404', () => {
      expect(status).to.be.equal(404);
    });
    it('A requisição GET para a rota retorna a mensagem "Esse cliente não existe"', () => {
      expect(body.message).to.be.equal("Esse cliente não existe");
    });
  })
  describe('Quando é passado um parâmetro que não é um número', () => {
    let body: HTTPErrorMessage;
    before(async () => {
      const response = await chai.request(app).get('/ativos/cliente/teste')
      status = response.status;
      body = response.body;
    })
    it('A requisição GET para a rota retorna o status 404', () => {
      expect(status).to.be.equal(404);
    });
    it('A requisição GET para a rota retorna a mensagem "Essa rota está incorreta"', () => {
      expect(body.message).to.be.equal("Essa rota está incorreta");
    });
  })
})

