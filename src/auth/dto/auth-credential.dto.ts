import { IsString, Matches, MaxLength, MinLength } from 'class-validator'

export class AuthCredentialDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  userName: string

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/, { message: '영문, 숫자, 특수기호를 조합하여 비밀번호를 만들어주세요.' })
  password: string
}
