import {User} from "./User";

export class LoginRequest {
  username: string;
  password: string;

  constructor(user: User) {
    this.username = user.username;
    this.password = user.password;
  }
}
