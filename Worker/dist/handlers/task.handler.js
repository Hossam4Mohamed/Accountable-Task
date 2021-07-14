"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.persistTaskStatus = void 0;
const task_service_1 = require("../services/task.service");
async function persistTaskStatus(message) {
    await task_service_1.storeSyncStatus(message);
}
exports.persistTaskStatus = persistTaskStatus;
//# sourceMappingURL=task.handler.js.map