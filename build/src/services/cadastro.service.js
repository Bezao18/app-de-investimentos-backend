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
const { Cliente } = require('../database/models');
const bcrypt_nodejs_1 = __importDefault(require("bcrypt-nodejs"));
const HTTPErrorMessage_1 = __importDefault(require("../utils/HTTPErrorMessage"));
const JWT_1 = require("../utils/JWT");
const createClient = (client) => __awaiter(void 0, void 0, void 0, function* () {
    const emailRegex = /.+@.+.com$/gm;
    const emailIsValid = emailRegex.test(client.Email);
    if (String(client.Senha).length < 6) {
        throw new HTTPErrorMessage_1.default(400, 'O campo Senha precisa ter pelo menos 6 caracteres');
    }
    if (!emailIsValid) {
        throw new HTTPErrorMessage_1.default(400, 'Email inválido');
    }
    const clientExists = yield Cliente.findOne({ where: { Email: client.Email } });
    if (clientExists) {
        throw new HTTPErrorMessage_1.default(409, 'Já existe um cliente com esse Email');
    }
    const salt = bcrypt_nodejs_1.default.genSaltSync(5);
    const Senha = bcrypt_nodejs_1.default.hashSync(client.Senha, salt);
    Cliente.create({ Email: client.Email, Senha, Saldo: 0 });
    const token = (0, JWT_1.createToken)(client);
    return token;
});
exports.default = createClient;
