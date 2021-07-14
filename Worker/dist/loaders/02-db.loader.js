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
const Logger = __importStar(require("signale"));
const mongoose_1 = __importDefault(require("mongoose"));
async function load() {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    };
    try {
        await mongoose_1.default.connect(process.env.MONGO_URL, options);
        Logger.success('Connected to Database successfully');
    }
    catch (e) {
        Logger.error('Error Connecting to Database');
        process.exit(0);
    }
}
exports.default = load;
//# sourceMappingURL=02-db.loader.js.map