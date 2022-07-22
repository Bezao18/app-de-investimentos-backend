import chai from 'chai'
import chaiHttp from 'chai-http';
import { before } from 'mocha';
import app from '../../src/app';
import { IAtivo } from '../../src/interfaces';


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
  it('A requisição GET para a rota retorna o status 200', async () => {
    expect(status).to.be.equal(200);
  });
  it('A requisição GET para a rota retorna um array de objetos', async () => {
    expect(body).to.be.an('array');    
  });
  it('Os objetos retornados no array possuem as chaves "CodAtivo", "QtdeAtivo" e "Valor"', async () => {
    expect(body[0]).to.include.all.keys("CodAtivo", "QtdeAtivo", "Valor");
  });
})
