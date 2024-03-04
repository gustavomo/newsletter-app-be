"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
(0, assert_1.default)(process.env.DB_NAME, 'DB_NAME configuration is required.');
(0, assert_1.default)(process.env.DB_USER, 'DB_USER configuration is required.');
(0, assert_1.default)(process.env.DB_PWD, 'DB_PWD configuration is required.');
(0, assert_1.default)(process.env.PORT, 'PORT configuration is required.');
const config = {
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PWD: process.env.DB_PWD,
    PORT: process.env.PORT,
};
exports.default = config;
