import { BadRequestException } from '@nestjs/common';

export function ExistingUser(username: string) {
  throw new BadRequestException(`usuário com o username ${username} já existe`);
}
