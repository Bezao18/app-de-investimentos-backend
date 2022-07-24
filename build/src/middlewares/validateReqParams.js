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
exports.validateCodAtivo = exports.validateCodCliente = void 0;
const HTTPErrorMessage_1 = __importDefault(require("../utils/HTTPErrorMessage"));
const validateCodCliente = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { CodCliente } = req.params;
    if (!Number(CodCliente)) {
        throw new HTTPErrorMessage_1.default(404, 'Essa rota está incorreta');
    }
    return next();
});
exports.validateCodCliente = validateCodCliente;
const validateCodAtivo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { CodAtivo } = req.params;
    if (!Number(CodAtivo)) {
        throw new HTTPErrorMessage_1.default(404, 'Essa rota está incorreta');
    }
    return next();
});
exports.validateCodAtivo = validateCodAtivo;
