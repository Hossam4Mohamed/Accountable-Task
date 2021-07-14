"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Logger = __importStar(require("signale"));
const helpers_1 = require("./helpers");
const errorHandler_1 = require("./errorHandler");
const app = express_1.default();
app.get('/refreshToken', errorHandler_1.asyncTryCatch(async (req, res) => {
    if (process.env.IS_UNAVAILABLE)
        throw errorHandler_1.TECHNICAL_FAILURE_ERR;
    const { account } = req.query;
    if (!account)
        throw errorHandler_1.UNAUTHORIZED_ERR;
    const token = jsonwebtoken_1.default.sign({ account }, process.env.SECRET_KEY || 'SECRET_KEY', {
        expiresIn: process.env.JWT_EXPIRES_PERIOD || 2 * 60 * 60,
    });
    return { token };
}));
app.get('/transactions', errorHandler_1.asyncTryCatch(async (req, res) => {
    if (process.env.IS_UNAVAILABLE || true)
        throw errorHandler_1.UNAUTHORIZED_ERR;
    const { access_token } = req.headers;
    if (!access_token)
        throw errorHandler_1.UNAUTHORIZED_ERR;
    const { intervalFetching } = req.query;
    const payload = jsonwebtoken_1.default.verify(access_token, process.env.SECRET_KEY || 'SECRET_KEY');
    if (!payload.account)
        throw errorHandler_1.UNAUTHORIZED_ERR;
    return helpers_1.mockTransactionsList(payload.account, Number(intervalFetching));
}));
app.listen(process.env.PORT || 4000, () => {
    Logger.success('Bank Api Server is listening on port: %s', process.env.PORT || 4000);
});
//# sourceMappingURL=app.js.map