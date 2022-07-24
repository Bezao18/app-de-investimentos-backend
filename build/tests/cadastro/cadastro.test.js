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
const JWT_1 = require("../../src/utils/JWT");
const resetDatabase_1 = __importDefault(require("../utils/resetDatabase"));
const dotenv_1 = __importDefault(require("dotenv"));
const { Cliente } = require('../../src/database/models');
chai_1.default.use(chai_http_1.default);
dotenv_1.default.config();
const { expect } = chai_1.default;
describe('Testa a rota POST /cadastro', () => {
    let body;
    let status;
    let reqBody;
    describe('Enviando um body com Email e Senha válidos', () => {
        (0, mocha_1.before)(() => __awaiter(void 0, void 0, void 0, function* () {
            reqBody = { Email: 'teste@email.com', Senha: 'password' };
            const response = yield chai_1.default.request(app_1.default).post('/cadastro').send(reqBody);
            status = response.status;
            body = response.body;
        }));
        (0, resetDatabase_1.default)();
        it('A requisição retorna o status 200', () => {
            expect(status).to.be.equal(200);
        });
        it('A requisição retorna um objeto com um token válido', () => {
            expect(body).to.be.an('object');
            const { Email } = (0, JWT_1.validateJWT)(body.token);
            expect(Email).to.be.equal(reqBody.Email);
        });
        it('O cliente é inserido no banco de dados', () => __awaiter(void 0, void 0, void 0, function* () {
            const client = yield Cliente.findOne({ where: { Email: reqBody.Email } });
            expect(client).to.not.equal(null);
        }));
    });
    describe('Enviando um body com Email inválido', () => {
        (0, mocha_1.before)(() => __awaiter(void 0, void 0, void 0, function* () {
            reqBody = { Email: 'email.com', Senha: 'password' };
            const response = yield chai_1.default.request(app_1.default).post('/cadastro').send(reqBody);
            status = response.status;
            body = response.body;
        }));
        it('A requisição retorna o status 400', () => {
            expect(status).to.be.equal(400);
        });
        it('A requisição retorna a mensagem "Email inválido"', () => {
            expect(body.message).to.be.equal("Email inválido");
        });
    });
    describe('Enviando um body com Senha inválida', () => {
        (0, mocha_1.before)(() => __awaiter(void 0, void 0, void 0, function* () {
            reqBody = { Email: 'teste@email.com', Senha: 'senha' };
            const response = yield chai_1.default.request(app_1.default).post('/cadastro').send(reqBody);
            status = response.status;
            body = response.body;
        }));
        it('A requisição retorna o status 400', () => {
            expect(status).to.be.equal(400);
        });
        it('A requisição retorna a mensagem "O campo Senha precisa ter pelo menos 6 caracteres"', () => {
            expect(body.message).to.be.equal("O campo Senha precisa ter pelo menos 6 caracteres");
        });
    });
    describe('Enviando um body sem Email', () => {
        (0, mocha_1.before)(() => __awaiter(void 0, void 0, void 0, function* () {
            reqBody = { Senha: 'senha' };
            const response = yield chai_1.default.request(app_1.default).post('/cadastro').send(reqBody);
            status = response.status;
            body = response.body;
        }));
        it('A requisição retorna o status 400', () => {
            expect(status).to.be.equal(400);
        });
        it('A requisição retorna a mensagem "O campo Email é obrigatório"', () => {
            expect(body.message).to.be.equal("O campo Email é obrigatório");
        });
    });
    describe('Enviando um body sem Senha', () => {
        (0, mocha_1.before)(() => __awaiter(void 0, void 0, void 0, function* () {
            reqBody = { Email: 'teste@email.com' };
            const response = yield chai_1.default.request(app_1.default).post('/cadastro').send(reqBody);
            status = response.status;
            body = response.body;
        }));
        it('A requisição retorna o status 400', () => {
            expect(status).to.be.equal(400);
        });
        it('A requisição retorna a mensagem "O campo Senha é obrigatório"', () => {
            expect(body.message).to.be.equal("O campo Senha é obrigatório");
        });
    });
    describe('Enviando um body com um Email já existente', () => {
        (0, mocha_1.before)(() => __awaiter(void 0, void 0, void 0, function* () {
            reqBody = { Email: 'silviosantos@email.com', Senha: 'password' };
            const response = yield chai_1.default.request(app_1.default).post('/cadastro').send(reqBody);
            status = response.status;
            body = response.body;
        }));
        it('A requisição retorna o status 400', () => {
            expect(status).to.be.equal(409);
        });
        it('A requisição retorna a mensagem "Já existe um cliente com esse Email"', () => {
            expect(body.message).to.be.equal("Já existe um cliente com esse Email");
        });
    });
});
