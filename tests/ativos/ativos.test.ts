import chai from 'chai'
import chaiHttp from 'chai-http';
import { before } from 'mocha';
import app from '../../src/app';
import { IAtivo } from '../../src/interfaces';

chai.use(chaiHttp);
const { expect } = chai;

describe('Testa a rota GET /ativos', () => {
  let body: IAtivo[];
  let status: number;

  before(async () => {
    const response = await chai.request(app).get('/ativos')
    status = response.status;
    body = response.body;
  })

  it('A requisição retorna o status 200', () => {
    expect(status).to.be.equal(200);
  });

  it('A requisição retorna um array de objetos', () => {
    expect(body).to.be.an('array');
    expect(body[0]).to.be.an('object');
  });

  it('Os objetos retornados no array possuem apenas as chaves "CodAtivo", "QtdeAtivo" e "Valor"', () => {
    expect(body[0]).to.include.all.keys("CodAtivo", "QtdeAtivo", "Valor");
  });
})

