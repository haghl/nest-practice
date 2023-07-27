import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { BoardsService } from './boards.service'
import { BoardStatus, Boards } from './board.model'
import { CreateBoardDto } from './dto/create-board.dto'

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  getAllBoards(): Boards[] {
    return this.boardsService.getAllBoards()
  }

  @Get('/:id')
  getBoardById(@Param('id') id: string): Boards {
    return this.boardsService.getBoardById(id)
  }

  @Post()
  creatBoards(@Body() createBoardDto: CreateBoardDto): Boards {
    return this.boardsService.creatBoards(createBoardDto)
  }

  @Delete('/:id')
  deleteBoard(@Param('id') id: string): void {
    this.boardsService.deleteBoard(id)
  }

  @Patch('/:id')
  updateBoardStatus(@Param('id') id: string, @Body('status') status: BoardStatus): void {
    re this.boardsService.deleteBoard(id)
  }
}
