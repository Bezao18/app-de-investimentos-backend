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
const { Cliente } = require('../database/models');
const checkClient = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { CodCliente } = req.body;
    const cliente = yield Cliente.findByPk(CodCliente, { attributes: ['CodCliente'] });
    if (!cliente) {
        throw new HTTPErrorMessage_1.default(404, 'Esse cliente não existe');
    }
    return next();
});
exports.default = checkClient;
