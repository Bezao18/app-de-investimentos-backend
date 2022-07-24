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
describe('Testa a rota GET /conta/:CodCliente/ordens', () => {
    let body;
    let status;
    describe('Quando é passado o CodCliente de um cliente existente', () => {
        (0, mocha_1.before)(() => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield chai_1.default.request(app_1.default).get('/conta/1/ordens');
            status = response.status;
            body = response.body;
        }));
        it('A requisição retorna o status 200', () => {
            expect(status).to.be.equal(200);
        });
        it('A requisição retorna um array de objetos', () => {
            expect(body).to.be.an('array');
            expect(body[0]).to.be.an('object');
        });
        it('O objeto retornado possui apenas as chaves "CodCliente", "CodAtivo",' +
            ' "OrdemId", "Horário", "QtdeAtivo", "ValorDaOrdem" e "Tipo"', () => {
            expect(body[0]).to.include.all.keys("CodCliente", "CodAtivo", "OrdemId", "Horário", "QtdeAtivo", "ValorDaOrdem", "Tipo");
        });
    });
    describe('Quando é passado o CodCliente de um cliente que não existe', () => {
        let body;
        (0, mocha_1.before)(() => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield chai_1.default.request(app_1.default).get('/conta/15/ordens');
            status = response.status;
            body = response.body;
        }));
        it('A requisição retorna o status 404', () => {
            expect(status).to.be.equal(404);
        });
        it('A requisição retorna a mensagem "Esse cliente não existe"', () => {
            expect(body.message).to.be.equal("Esse cliente não existe");
        });
    });
    describe('Quando é passado o CodCliente de um cliente que não executou nenhuma ordem', () => {
        let body;
        (0, mocha_1.before)(() => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield chai_1.default.request(app_1.default).get('/conta/4/ordens');
            status = response.status;
            body = response.body;
        }));
        it('A requisição retorna o status 404', () => {
            expect(status).to.be.equal(404);
        });
        it('A requisição retorna a mensagem "Esse cliente não realizou nenhuma ordem"', () => {
            expect(body.message).to.be.equal("Esse cliente não realizou nenhuma ordem");
        });
    });
    describe('Quando é passado um parâmetro que não é um número', () => {
        let body;
        (0, mocha_1.before)(() => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield chai_1.default.request(app_1.default).get('/conta/teste/ordens');
            status = response.status;
            body = response.body;
        }));
        it('A requisição retorna o status 404', () => {
            expect(status).to.be.equal(404);
        });
        it('A requisição retorna a mensagem "Essa rota está incorreta"', () => {
            expect(body.message).to.be.equal("Essa rota está incorreta");
        });
    });
});
