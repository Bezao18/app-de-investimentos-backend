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
exports.getAssetsByClient = exports.getAssets = void 0;
const ativos_service_1 = require("../services/ativos.service");
const HTTPErrorMessage_1 = __importDefault(require("../utils/HTTPErrorMessage"));
const getAssets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { CodAtivo } = req.params;
    if (CodAtivo) {
        const asset = yield (0, ativos_service_1.getAsset)(Number(CodAtivo));
        return res.status(200).json(asset);
    }
    const assets = yield (0, ativos_service_1.getAll)();
    return res.status(200).json(assets);
});
exports.getAssets = getAssets;
const getAssetsByClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { CodCliente } = req.params;
    if (!CodCliente) {
        throw new HTTPErrorMessage_1.default(404, 'Esse cliente não existe');
    }
    const clientPortfolio = yield (0, ativos_service_1.getClientPortfolio)(Number(CodCliente));
    return res.status(200).json(clientPortfolio);
});
exports.getAssetsByClient = getAssetsByClient;
