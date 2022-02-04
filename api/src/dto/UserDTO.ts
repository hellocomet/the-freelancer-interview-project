import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { ErrorMessages } from '../utils'

class UserPatchDTO {
  @IsString({ message: ErrorMessages.IsNotValid })
  @IsNotEmpty({ message: ErrorMessages.IsRequiredOrEmpty })
  username?: string

  @IsString({ message: ErrorMessages.IsNotValid })
  @IsNotEmpty({ message: ErrorMessages.IsRequiredOrEmpty })
  lastname?: string

  @IsString({ message: ErrorMessages.IsNotValid })
  @IsNotEmpty({ message: ErrorMessages.IsRequiredOrEmpty })
  firstname?: string

  @IsString({ message: ErrorMessages.IsNotValid })
  @IsDateString(undefined, { message: ErrorMessages.IsNotValidDate })
  @IsNotEmpty({ message: ErrorMessages.IsRequiredOrEmpty })
  birthDate?: string

  @IsBoolean({ message: ErrorMessages.IsNotValid })
  isVisible?: boolean

  @IsString({ message: ErrorMessages.IsNotValid })
  language?: string

  @IsNumber(undefined, { message: ErrorMessages.IsNotValid })
  retribution?: number
}

export { UserPatchDTO }
