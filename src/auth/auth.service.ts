import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(data: { username: string; password: string; displayName: string }) {
    const existing = await this.usersService.findByUsername(data.username);
    if (existing) throw new UnauthorizedException('Username already taken');

    const hashed = await bcrypt.hash(data.password, 10);
    return this.usersService.createUser({
      ...data,
      password: hashed,
    });
  }
}
