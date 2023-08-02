import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserRepository } from './user.repository'
import { AuthCredentialDto } from './dto/auth-credential.dto'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(private authRepository: UserRepository) {}

  async signUp(authCredentialsDto: AuthCredentialDto): Promise<void> {
    return this.authRepository.createuser(authCredentialsDto)
  }

  async login(authCredentialsDto: AuthCredentialDto): Promise<string> {
    const { userName, password } = authCredentialsDto
    const user = await this.authRepository.findOneBy({ userName })
    if (user && (await bcrypt.compare(password, user.password))) return '로그인이 성공적으로 되었습니다.'
    else throw new UnauthorizedException('로그인 실패!')
  }
}
