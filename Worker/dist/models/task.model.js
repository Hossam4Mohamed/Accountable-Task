"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TaskSchema = new mongoose_1.Schema({
    success: { type: Boolean },
}, { timestamps: true });
const taskModel = mongoose_1.model('Task', TaskSchema);
exports.default = taskModel;
//# sourceMappingURL=task.model.js.map