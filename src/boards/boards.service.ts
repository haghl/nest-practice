import { Injectable, NotFoundException } from '@nestjs/common'
import { v1 as uuid } from 'uuid'
import { BoardStatus } from './board-status.enum'
import { CreateBoardDto } from './dto/create-board.dto'
import { DataSource } from 'typeorm'
import { Board } from './board.entity'
import { BoardRepository } from './board.repository'

@Injectable()
export class BoardsService {
  constructor(private boardRepository: BoardRepository) {}
  // 로컬메모리 연습
  // getAllBoards(): Boards[] {
  //   return this.boards
  // }
  getBoardById(id: number): Promise<Board> {
    const found = this.boardRepository.findOneBy({ id })
    if (!found) throw new NotFoundException(`해당 게시물이 없습니다.`)
    return found
  }
  // creatBoards(createBoardDto: CreateBoardDto) {
  //   const board: Boards = { ...createBoardDto, id: uuid(), status: BoardStatus.PUBLIC }
  //   this.boards.push(board)
  //   return board
  // }
  // deleteBoard(id: string): void {
  //   const found = this.getBoardById(id)
  //   this.boards = this.boards.filter((board) => board.id !== found.id)
  // }
  // updateBoardStatus(id: string, status: BoardStatus): Boards {
  //   const board = this.getBoardById(id)
  //   board.status = status
  //   return board
  // }
}
