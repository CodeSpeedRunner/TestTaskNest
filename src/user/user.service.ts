import { Injectable } from '@nestjs/common';
import { User } from '../dto/user-dto';
import { UserRole } from '../types/role-enum';

@Injectable()
export class UserService {
  private readonly users: User[] = [
    { id: 1, username: 'User1', password: 'qwert', role: UserRole.ADMIN },
    { id: 1, username: 'User2', password: '1q2w3e', role: UserRole.NORMAL },
    { id: 1, username: 'User3', password: '1234', role: UserRole.LIMITED },
  ];

  async getUser(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
