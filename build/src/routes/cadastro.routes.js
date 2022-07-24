"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cadastro_controller_1 = __importDefault(require("../controllers/cadastro.controller"));
const validateClient_1 = __importDefault(require("../middlewares/validateClient"));
const cadastroRoutes = (0, express_1.Router)();
cadastroRoutes.post('/', validateClient_1.default, cadastro_controller_1.default);
exports.default = cadastroRoutes;
