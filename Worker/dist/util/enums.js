"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueName = exports.ErrorCode = void 0;
var ErrorCode;
(function (ErrorCode) {
    ErrorCode["InternalServerError"] = "INTERNAL_SERVER_ERROR";
    ErrorCode["UnAuthorized"] = "UNAUTHORIZED";
    ErrorCode["ValidationError"] = "VALIDATION_ERROR";
    ErrorCode["Forbidden"] = "FORBIDDEN";
    ErrorCode["LoginFailed"] = "LOGIN_FAILED";
    ErrorCode["TechnicalFailure"] = "TECHNICAL_FAILURE";
})(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));
var QueueName;
(function (QueueName) {
    QueueName["TaskQ"] = "task_queue";
    QueueName["AckQ"] = "ack_queue";
    QueueName["ChangeUserStatusQ"] = "user_queue";
})(QueueName = exports.QueueName || (exports.QueueName = {}));
//# sourceMappingURL=enums.js.map