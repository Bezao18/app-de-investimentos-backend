"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const investimentos_routes_1 = __importDefault(require("./investimentos.routes"));
const ativos_routes_1 = __importDefault(require("./ativos.routes"));
const conta_routes_1 = __importDefault(require("./conta.routes"));
const login_routes_1 = __importDefault(require("./login.routes"));
const cadastro_routes_1 = __importDefault(require("./cadastro.routes"));
const routes = (0, express_1.Router)();
routes.use('/conta', conta_routes_1.default);
routes.use('/investimentos', investimentos_routes_1.default);
routes.use('/ativos', ativos_routes_1.default);
routes.use('/login', login_routes_1.default);
routes.use('/cadastro', cadastro_routes_1.default);
exports.default = routes;
