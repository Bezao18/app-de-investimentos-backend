"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const mocha_1 = require("mocha");
const app_1 = __importDefault(require("../../src/app"));
chai_1.default.use(chai_http_1.default);
const { expect } = chai_1.default;
describe('Testa a rota GET /ativos/cliente/:CodCliente', () => {
    let body;
    let status;
    describe('Quando é passado o CodCliente de um cliente existente', () => {
        (0, mocha_1.before)(() => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield chai_1.default.request(app_1.default).get('/ativos/cliente/1');
            status = response.status;
            body = response.body;
        }));
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
    });
    describe('Quando é passado o CodCliente de um cliente que não existe', () => {
        let body;
        (0, mocha_1.before)(() => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield chai_1.default.request(app_1.default).get('/ativos/cliente/200');
            status = response.status;
            body = response.body;
        }));
        it('A requisição GET para a rota retorna o status 404', () => {
            expect(status).to.be.equal(404);
        });
        it('A requisição GET para a rota retorna a mensagem "Esse cliente não existe"', () => {
            expect(body.message).to.be.equal("Esse cliente não existe");
        });
    });
    describe('Quando é passado o CodCliente de um cliente que não tem nenhum ativo', () => {
        let body;
        (0, mocha_1.before)(() => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield chai_1.default.request(app_1.default).get('/ativos/cliente/4');
            status = response.status;
            body = response.body;
        }));
        it('A requisição GET para a rota retorna o status 404', () => {
            expect(status).to.be.equal(404);
        });
        it('A requisição GET para a rota retorna a mensagem "Esse cliente não possui nenhum ativo"', () => {
            expect(body.message).to.be.equal("Esse cliente não possui nenhum ativo");
        });
    });
    describe('Quando é passado um parâmetro que não é um número', () => {
        let body;
        (0, mocha_1.before)(() => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield chai_1.default.request(app_1.default).get('/ativos/cliente/teste');
            status = response.status;
            body = response.body;
        }));
        it('A requisição GET para a rota retorna o status 404', () => {
            expect(status).to.be.equal(404);
        });
        it('A requisição GET para a rota retorna a mensagem "Essa rota está incorreta"', () => {
            expect(body.message).to.be.equal("Essa rota está incorreta");
        });
    });
});
