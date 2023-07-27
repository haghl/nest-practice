import { Injectable, NotFoundException } from '@nestjs/common'
import { v1 as uuid } from 'uuid'
import { BoardStatus, Boards } from './board.model'
import { CreateBoardDto } from './dto/create-board.dto'

@Injectable()
export class BoardsService {
  private boards: Boards[] = []

  getAllBoards(): Boards[] {
    return this.boards
  }

  getBoardById(id: string): Boards {
    const response = this.boards.find((board) => board.id === id)
    if (!response) throw new NotFoundException(`해당 게시물이 없습니다.`)
    return response
  }

  creatBoards(createBoardDto: CreateBoardDto) {
    const board: Boards = { ...createBoardDto, id: uuid(), status: BoardStatus.PUBLIC }
    this.boards.push(board)
    return board
  }

  deleteBoard(id: string): void {
    const found = this.getBoardById(id)
    this.boards = this.boards.filter((board) => board.id !== found.id)
  }

  updateBoardStatus(id: string, status: BoardStatus): Boards {
    const board = this.getBoardById(id)
    board.status = status
    return board
  }
}
