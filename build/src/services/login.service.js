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
const HTTPErrorMessage_1 = __importDefault(require("../utils/HTTPErrorMessage"));
const JWT_1 = require("../utils/JWT");
const { Cliente } = require('../database/models');
const bcrypt_nodejs_1 = __importDefault(require("bcrypt-nodejs"));
const clientLogin = (clientRequest) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield Cliente.findOne({ where: { Email: clientRequest.Email } });
    if (!client) {
        throw new HTTPErrorMessage_1.default(400, 'Dados inválidos');
    }
    const passwordIsValid = bcrypt_nodejs_1.default.compareSync(clientRequest.Senha, client.Senha);
    if (!passwordIsValid) {
        throw new HTTPErrorMessage_1.default(400, 'Dados inválidos');
    }
    const token = (0, JWT_1.createToken)(clientRequest);
    return token;
});
exports.default = clientLogin;
