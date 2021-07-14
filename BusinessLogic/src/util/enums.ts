export enum ErrorCode {
  InternalServerError = 'INTERNAL_SERVER_ERROR',
  UnAuthorized = 'UNAUTHORIZED',
  ValidationError = 'VALIDATION_ERROR',
  Forbidden = 'FORBIDDEN',
  LoginFailed = 'LOGIN_FAILED',
  NotFound = 'NOT_FOUND',
}

export enum QueueName {
  TaskQ = 'task_queue',
  AckQ = 'ack_queue',
  ChangeUserStatusQ = 'user_queue',
}
