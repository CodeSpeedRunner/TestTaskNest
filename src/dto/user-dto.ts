import { UserRole } from 'src/types/role-enum';

export class User {
  id: number;
  username: string;
  password: string;
  role: UserRole;
}
