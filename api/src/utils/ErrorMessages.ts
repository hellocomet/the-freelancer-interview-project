const ErrorMessages = {
  DoesNotExist: 'does not exist',
  IsNotValid: 'is not valid',
  IsNotValidDate: 'is not a valid ISO 8601 date',
  Unknow: 'unknow',
  IsRequiredOrEmpty: 'is required or empty',
} as const

type ErrorMessage = typeof ErrorMessages[keyof typeof ErrorMessages]

export type { ErrorMessage }
export { ErrorMessages }
