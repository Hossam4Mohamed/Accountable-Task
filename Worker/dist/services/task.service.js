"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeSyncStatus = void 0;
const axiosAgents_1 = require("../plugins/axiosAgents");
async function storeSyncStatus(status) {
    await axiosAgents_1.baseAxios.post('/tasks', status);
}
exports.storeSyncStatus = storeSyncStatus;
//# sourceMappingURL=task.service.js.map