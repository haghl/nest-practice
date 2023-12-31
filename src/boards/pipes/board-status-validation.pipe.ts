import { BadRequestException, PipeTransform } from '@nestjs/common'
import { BoardStatus } from '../board-status.enum'

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOption = [BoardStatus.PRIVATE, BoardStatus.PUBLIC]

  transform(value: any) {
    value = value.toUpperCase()
    if (!this.isStatusValid(value)) throw new BadRequestException('status 값을 잘못입력하였습니다.')

    return value
  }

  private isStatusValid(value: any) {
    const idx = this.StatusOption.indexOf(value)
    return idx !== -1
  }
}
