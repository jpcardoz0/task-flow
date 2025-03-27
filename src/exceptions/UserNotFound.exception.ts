import { NotFoundException } from '@nestjs/common';

export function UserNotFound(userId: number, username?: string) {
  if (userId) {
    throw new NotFoundException(`usuário com id ${userId} não foi encontrado`);
  } else if (userId === 0) {
    throw new NotFoundException(
      `usuário com username ${username} não foi encontado.`,
    );
  } else {
    throw new Error('uso errado da função');
  }
}
