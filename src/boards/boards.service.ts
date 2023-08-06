import { Injectable, NotFoundException } from '@nestjs/common'
import { v1 as uuid } from 'uuid'
import { BoardStatus } from './board-status.enum'
import { CreateBoardDto } from './dto/create-board.dto'
import { DataSource } from 'typeorm'
import { Board } from './board.entity'
import { BoardRepository } from './board.repository'
import { User } from 'src/auth/user.entity'

@Injectable()
export class BoardsService {
  constructor(private boardRepository: BoardRepository) {}

  async getAllBoards(user: User): Promise<Board[]> {
    const query = this.boardRepository.createQueryBuilder('board')
    query.where('board.userId = :userId', { userId: user.id })
    const boards = await query.getMany()

    return boards
  }
  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOneBy({ id })
    if (!found) throw new NotFoundException(`해당 게시물이 없습니다.`)
    return found
  }

  creatBoards(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, user)
  }

  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id)

    if (result.affected === 0) throw new NotFoundException('해당 ID에 게시물이 없습니다.')
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id)
    board.status = status
    await this.boardRepository.save(board)
    return board
  }
}
