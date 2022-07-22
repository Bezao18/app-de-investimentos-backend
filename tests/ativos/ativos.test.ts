import chai from 'chai'
import chaiHttp from 'chai-http';
import { Response } from 'express';
import { before } from 'mocha';
import app from '../../src/app';
import { IAtivo } from '../../src/interfaces';


chai.use(chaiHttp);
const { expect } = chai;

describe('Testa a rota /ativos', () => {
  it('A requisição GET para a rota retorna um array de objetos', async () => {
    const { body, status } = await chai.request(app).get('/ativos')
    expect(body).to.be.an('array');
  });
})
