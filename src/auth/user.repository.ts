import { Repository } from 'typeorm'
import { CustomRepository } from 'src/decorators/typeorm-ex.decorator'
import { ConflictException, InternalServerErrorException } from '@nestjs/common'
import * as bcrypt from 'bcryptjs'
import { User } from './user.entity'
import { AuthCredentialDto } from './dto/auth-credential.dto'

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async createuser(authCredentialDto: AuthCredentialDto): Promise<void> {
    const { userName, password } = authCredentialDto
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = this.create({ userName, password: hashedPassword })
    try {
      await this.save(user)
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') throw new ConflictException('중복된 이름이 존재합니다.')
      else throw new InternalServerErrorException()
    }
  }
}
