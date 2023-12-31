import { Repository } from 'typeorm'
import { Board } from './board.entity'
import { CustomRepository } from 'src/decorators/typeorm-ex.decorator'
import { CreateBoardDto } from './dto/create-board.dto'
import { BoardStatus } from './board-status.enum'
import { User } from 'src/auth/user.entity'

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    const board = this.create({ ...createBoardDto, status: BoardStatus.PUBLIC, user })

    await this.save(board)
    return board
  }
}
