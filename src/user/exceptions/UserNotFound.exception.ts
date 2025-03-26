import { NotFoundException } from '@nestjs/common';

export function UserNotFound(userId: number) {
  throw new NotFoundException(`usuário com id ${userId} não foi encontrado`);
}
