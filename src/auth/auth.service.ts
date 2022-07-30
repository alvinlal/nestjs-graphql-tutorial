import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/User.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Partial<User>> | null {
    const user = await this.usersService.findOne(email);

    if (user && user.password === password) {
      delete user.password;
      return user;
    }
    return null;
  }
}
