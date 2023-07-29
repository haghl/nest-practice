import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { BoardsService } from './boards.service'
import { BoardStatus } from './board-status.enum'
import { CreateBoardDto } from './dto/create-board.dto'
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe'

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  // 로컬메모리 연습
  // @Get()
  // getAllBoards(): Boards[] {
  //   return this.boardsService.getAllBoards()
  // }

  // @Get('/:id')
  // getBoardById(@Param('id') id: string): Boards {
  //   return this.boardsService.getBoardById(id)
  // }

  // @Post()
  // @UsePipes(ValidationPipe)
  // creatBoards(@Body() createBoardDto: CreateBoardDto): Boards {
  //   return this.boardsService.creatBoards(createBoardDto)
  // }

  // @Delete('/:id')
  // deleteBoard(@Param('id') id: string): void {
  //   this.boardsService.deleteBoard(id)
  // }

  // @Patch('/:id/status')
  // updateBoardStatus(@Param('id') id: string, @Body('status', BoardStatusValidationPipe) status: BoardStatus) {
  //   return this.boardsService.updateBoardStatus(id, status)
  // }
}
