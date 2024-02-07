import { Injectable } from '@nestjs/common';
import { User } from '../dto/user-dto';
import { UserRole } from '../types/role-enum';

@Injectable()
export class UserService {
  private readonly users: User[] = [
    { id: 1, username: 'John', password: '12345', role: UserRole.ADMIN },
    { id: 1, username: 'Harvy', password: '56789', role: UserRole.NORMAL },
    { id: 1, username: 'Lavy', password: 'qwerty', role: UserRole.LIMITED },
  ];

  async getUser(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
