// response messages

export enum Messages {
  // Health Check
  SUCCESS_HEALTH = 'Service is running.',
  // Generic Exceptions
  EXCEPTION_BAD_REQUEST = 'The request could not be completed due to validation errors.',
  EXCEPTION_UNAUTHORIZED = 'User not authorized.',
  EXCEPTION_FORBIDDEN = 'You do not have permission to perform the action on the requested resource.',
  EXCEPTION_NOT_FOUND = 'Resource not found.',
  EXCEPTION_PRECONDITION_FAILED = 'The request does not meet a precondition.',
  EXCEPTION_DEFAULT = 'An unknown error occurred.',
  EXCEPTION_REFRESH_TOKEN_NOT_FOUND = 'Session terminated.',
  EXCEPTION_REFRESH_TOKEN_EXPIRED = 'Session expired due to inactivity.',
  EXCEPTION_INTERNAL_SERVER_ERROR = 'An internal error occurred.',
  EXCEPTION_OWN_ACCOUNT_ACTION = 'You do not have permission to perform this action on your own account.',

  // Generic Success Messages
  SUCCESS_DEFAULT = 'Task completed successfully!',
  SUCCESS_LIST = 'Records obtained successfully.',
  SUCCESS_CREATE = 'Record created successfully.',
  SUCCESS_UPDATE = 'Record updated successfully.',
  SUCCESS_DELETE = 'Record deleted successfully.',

  // Business Logic Messages
  SUCCESS_RESTART_PASSWORD = 'A new password has been sent by email.',
  SUCCESS_RESEND_MAIL_ACTIVATION = 'A new activation email has been sent.',
  SUCCESS_ACCOUNT_UNLOCK = 'Account unlocked successfully.',
  SUCCESS_LOGIN = 'Session created successfully.',
  SUCCESS_LOGOUT = 'Session terminated successfully.',
  INVALID_USER_CREDENTIALS = 'Invalid user credentials.',
  NO_PERMISSION_USER = 'The user has no assigned roles.',
  INVALID_USER = 'The user does not exist or does not have a valid status.',
  INVALID_CREDENTIALS = 'Incorrect credentials.',
  INACTIVE_USER = 'The user is inactive.',
  PENDING_USER = 'The user is pending activation. Check your email.',
  INACTIVE_PERSON = 'The person record is inactive.',
  INVALID_PASSWORD_SCORE = 'The new password does not meet the required security level.',
  USER_BLOCKED = 'The user has been blocked due to too many failed login attempts. Check your email.',
  SUBJECT_EMAIL_ACCOUNT_ACTIVE = 'Credential generation.',
  SUBJECT_EMAIL_ACCOUNT_RECOVERY = 'Check your inbox. We sent a link so you can recover your account.',
  SUBJECT_EMAIL_ACCOUNT_RESET = 'Password reset.',
  SUBJECT_EMAIL_ACCOUNT_LOCKED = 'Temporary account lock.',
  EXISTING_USER = 'A user is already registered with the same document number.',
  EXISTING_EMAIL = 'A user is already registered with the same email address.',
  NEW_USER_ACCOUNT = 'User created successfully!',
  NEW_USER_ACCOUNT_VERIFY = 'Account activation.',
  ACCOUNT_ACTIVED_SUCCESSFULLY = 'Account activated successfully!',
  NO_PERMISSION_FOUND = 'Role not found.',

  // Parameters
  REPEATED_PARAMETER = 'Repeated parameter.',

  //Other
  GENERAL_ERROR = 'An error occurred.',
}
