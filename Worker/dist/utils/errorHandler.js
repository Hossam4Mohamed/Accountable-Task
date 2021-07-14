"use strict";
// class CustomError extends Error {
//   constructor(statusCode, code, message, details, errors) {
//     super(message);
//     Object.assign(this, {
//       statusCode, code, details, errors,
//     });
//   }
// }
// const asyncTryCatch = handler => async (req, res, next) => {
//   try {
//     const result = await handler(req, res);
//     return res.status(200).json(result);
//   } catch (error) {
//     if (error.isAxiosError) {
//       // eslint-disable-next-line no-ex-assign
//       error = error.response.data;
//     }
//     const {
//       message, details, code, statusCode, errors,
//     } = error;
//     const status = statusCode || 500;
//     logger[status === 500 ? 'error' : 'info'](
//       `Error in handling Request with Following Details: ${code} - ${
//         details || message
//       }`,
//     );
//     console.log({ error });
//     return res
//       .status(status)
//       .json({
//         code, message, details, success: false, errors,
//       });
//   }
// };
// const customParseJSON = (str) => {
//   try {
//     return JSON.parse(str);
//   } catch {
//     throw new CustomError(422, 'VALIDATION_ERROR', 'Not Valid JSON String');
//   }
// };
// module.exports = {
//   CustomError,
//   customParseJSON,
//   asyncTryCatch,
//   AUTH_ERR: new CustomError(403, 'Forbidden', 'you don\'t have this permission'),
//   SERVER_ERR: new CustomError(
//     500,
//     'Internal Server Error',
//     'Error in Server while handling Request',
//   ),
//   UNAUTHORIZED_ERR: new CustomError(
//     401,
//     'Unauthorized',
//     'You are not allowed to perform this action',
//   ),
//   VALIDATION_ERROR: message => new CustomError(422, 'VALIDATION_ERROR', message),
// };
//# sourceMappingURL=errorHandler.js.map