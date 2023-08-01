import { Repository } from 'typeorm'
import { User } from './user.entity'
import { CustomRepository } from 'src/decorators/typeorm-ex.decorator'

@CustomRepository(User)
export class UserRepository extends Repository<User> {}
