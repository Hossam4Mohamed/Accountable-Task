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
const Logger = __importStar(require("signale"));
const loaders_1 = require("./loaders");
async function bootstrap() {
    await loaders_1.init();
}
bootstrap();
// Handle warning and errors.
process.on('unhandledRejection', (reason, promise) => {
    Logger.warn('Unhandled Rejection at: %s, reason: %s', promise, reason);
    //Future logic.
});
process.on('warning', (warning) => {
    Logger.warn('Node.js warning -> name: %s , message: %s , stack: %s', warning.name, warning.message, warning.stack);
});
//# sourceMappingURL=app.js.map