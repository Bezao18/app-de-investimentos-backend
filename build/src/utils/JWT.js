"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJWT = exports.createToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
const HTTPErrorMessage_1 = __importDefault(require("./HTTPErrorMessage"));
dotenv_1.default.config();
const jwtConfig = {
    expiresIn: '15m',
    algorithm: 'HS256',
};
const secret = process.env.JWT_SECRET || 'segredo';
const createToken = ({ Email }) => {
    if (!secret) {
        throw new HTTPErrorMessage_1.default(500, 'Variável de ambiente JWT_SECRET indefinida');
    }
    const token = (0, jsonwebtoken_1.sign)({ Email }, secret, jwtConfig);
    return token;
};
exports.createToken = createToken;
const validateJWT = (token) => {
    try {
        const decodedToken = (0, jsonwebtoken_1.verify)(token, secret);
        return decodedToken;
    }
    catch (e) {
        throw new HTTPErrorMessage_1.default(401, 'Token inválido');
    }
};
exports.validateJWT = validateJWT;
