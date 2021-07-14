"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
// const handle401 = (statusCode) => {
// };
const instance = axios_1.default.create({
    baseURL: process.env.BANK_API_URL || 'http://localhost:4000',
});
instance.interceptors.request.use((config) => {
    return {
        ...config,
        headers: {
            ...config.headers,
        },
    };
});
// instance.interceptors.response.use(response => response, (error) => {
//   handle401(error.response && error.response.status);
//   return Promise.reject(error);
// });
exports.default = instance;
//# sourceMappingURL=axiosInstance.js.map