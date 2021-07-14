"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runPromisesSequentially = void 0;
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
async function runPromisesSequentially(asyncFunctionsArray, args) {
    return asyncFunctionsArray.reduce(async (startPromise, asyncFunction) => startPromise.then(() => asyncFunction(args)), Promise.resolve());
}
exports.runPromisesSequentially = runPromisesSequentially;
//# sourceMappingURL=asyncHelpers.js.map