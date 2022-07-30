import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/User.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}
  create(createUserInput: CreateUserInput) {
    const newUser = this.usersRepository.create(createUserInput);
    return this.usersRepository.save(newUser);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(email) {
    return this.usersRepository.findOne({ where: { email } });
  }
}
