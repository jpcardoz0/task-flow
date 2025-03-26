import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'username deve ser informado' })
  @IsString()
  username: string;

  @IsNotEmpty({ message: 'password deve ser informado' })
  @IsString()
  @MinLength(6)
  password: string;
}
