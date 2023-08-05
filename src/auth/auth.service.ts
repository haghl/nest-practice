import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserRepository } from './user.repository'
import { AuthCredentialDto } from './dto/auth-credential.dto'
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(private authRepository: UserRepository, private jwtService: JwtService) {}

  async signUp(authCredentialsDto: AuthCredentialDto): Promise<void> {
    return this.authRepository.createuser(authCredentialsDto)
  }

  async login(authCredentialsDto: AuthCredentialDto): Promise<{ userName: string; accessToken: string }> {
    const { userName, password } = authCredentialsDto
    const user = await this.authRepository.findOneBy({ userName })
    if (user && (await bcrypt.compare(password, user.password))) {
      // 유저 토큰 생성 ( Secret + payload)
      const payload = { userName }
      const accessToken = await this.jwtService.sign(payload)

      return { userName, accessToken }
    } else throw new UnauthorizedException('로그인 실패!')
  }
}
