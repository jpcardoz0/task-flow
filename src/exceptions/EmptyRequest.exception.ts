import { BadRequestException } from '@nestjs/common';

export function EmptyRequest() {
  throw new BadRequestException('request vazia');
}
