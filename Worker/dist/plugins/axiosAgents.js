"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bankApiAxios = exports.baseAxios = void 0;
const axios_1 = __importDefault(require("axios"));
function getAxiosInstance(baseURL, postfix) {
    const instance = axios_1.default.create({
        baseURL: postfix ? `${baseURL}/${postfix}` : baseURL,
    });
    instance.interceptors.request.use((config) => {
        return {
            ...config,
            headers: {
                ...config.headers,
            },
        };
    });
    return instance;
}
exports.baseAxios = getAxiosInstance(process.env.BASE_API_URL || 'http://localhost:3000', 'api');
exports.bankApiAxios = getAxiosInstance(process.env.BANK_API_URL || 'http://localhost:4000');
//# sourceMappingURL=axiosAgents.js.map