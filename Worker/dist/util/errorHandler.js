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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.VALIDATION_ERROR = exports.UNAUTHORIZED_ERR = exports.TECHNICAL_FAILURE_ERR = exports.CustomError = void 0;
const Logger = __importStar(require("signale"));
const enums_1 = require("./enums");
class CustomError extends Error {
    constructor(statusCode, code, message) {
        super(message);
        Object.assign(this, {
            statusCode,
            code,
        });
    }
}
exports.CustomError = CustomError;
exports.TECHNICAL_FAILURE_ERR = new CustomError(500, enums_1.ErrorCode.TechnicalFailure, 'The Bank is not available');
exports.UNAUTHORIZED_ERR = new CustomError(401, enums_1.ErrorCode.UnAuthorized, 'You are not allowed to perform this action');
exports.VALIDATION_ERROR = (message) => new CustomError(422, enums_1.ErrorCode.ValidationError, message);
exports.handleError = async (error, debug) => {
    const { message, code, stack } = error.isAxiosError
        ? error.response.data
        : error;
    const status = error.isAxiosError
        ? error.response.status
        : error.statusCode || 500;
    Logger[status === 500 ? 'error' : 'info'](`Error in handling Request with Following Details: ${code || 500} - ${message}`);
    if (debug)
        Logger.debug(stack);
    console.log({ error: error.response.data });
    console.log({ status });
    return {
        code,
        reasonOfFailure: message,
        success: false,
        accessInvalid: status === 401,
    };
};
//# sourceMappingURL=errorHandler.js.map