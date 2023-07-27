import { Injectable } from '@nestjs/common'
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
    return this.boards.find((board) => board.id === id)
  }

  creatBoards(createBoardDto: CreateBoardDto) {
    const board: Boards = { ...createBoardDto, id: uuid(), status: BoardStatus.PUBLIC }
    this.boards.push(board)
    return board
  }

  deleteBoard(id: string): void {
    this.boards = this.boards.filter((board) => board.id !== id)
  }

  updateBoardStatus(id: string, status: BoardStatus): Boards {
    const board = this.getBoardById(id)
    board.status = status
    return board
  }
}
