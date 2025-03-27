import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UserNotFound } from '../exceptions/UserNotFound.exception';
import { ExistingUser } from '../exceptions/ExistingUser.exception';
import { EmptyRequest } from '../exceptions/EmptyRequest.exception';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async findAllUsers() {
    const users = await this.userRepo.find();
    return users;
  }

  async findUserByName(name: string) {
    const user = await this.userRepo.findOneBy({ username: name });
    if (!user) UserNotFound(0, name);

    return user;
  }

  async findUserById(userId: number) {
    const user = await this.userRepo.findOneBy({ id: userId });

    if (!user) UserNotFound(userId);
    return user;
  }

  async createUser(dto: CreateUserDto) {
    const existingUser = await this.userRepo.findOneBy({
      username: dto.username,
    });
    if (existingUser) ExistingUser(dto.username);

    const newUser = this.userRepo.create(dto);
    await this.userRepo.save(newUser);
    return newUser;
  }

  async updateUser(userId: number, dto: CreateUserDto) {
    if (dto === undefined || Object.keys(dto).length === 0) EmptyRequest();

    if (dto.username) {
      const existingUser = await this.userRepo.findOneBy({
        username: dto.username,
      });
      if (existingUser) ExistingUser(dto.username);
    }

    await this.userRepo.update(userId, dto);
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) UserNotFound(userId);

    return user;
  }

  async deleteUser(userId: number) {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) UserNotFound(userId);

    await this.userRepo.delete(userId);
    return { message: `usuário com id ${userId} deletado` };
  }
}
