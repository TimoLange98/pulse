import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const token = request.cookies?.access_token;

    if (!token) {
      return false;
    }

    try {
      const decoded = this.jwtService.verify(token);
      request['user'] = decoded;
      return true;
    } catch (error) {
      return false;
    }
  }
}