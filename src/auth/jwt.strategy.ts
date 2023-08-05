import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from './user.repository'
import { User } from './user.entity'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {
    super({ secretOrKey: 'Secret1234', jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() })
  }

  async validate(payload) {
    const { userName } = payload
    const user: User = await this.userRepository.findOneBy({ userName })

    if (!user) throw new UnauthorizedException()

    return user
  }
}
