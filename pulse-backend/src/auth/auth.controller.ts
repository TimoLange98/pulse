import { Body, Controller, Get, Param, Post, Response } from '@nestjs/common';
import { Response as ResponseType } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { RegularAuthenticationCredentials } from 'src/types/RegularAuthenticationCredentials';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('google/verify')
  async verifyGoogleAuthentication(@Body() requestBody: { credential: string }, @Response() res: ResponseType): Promise<ResponseType<any, Record<string, any>>> {
    const googleUser = await this.authService.verifyGoogleAuthentication(requestBody.credential);
    if (!googleUser) return res.status(401).json({ success: false });
    
    const jwt = await this.authService.generateJwt(googleUser.sub, googleUser.email);
    
    res.cookie('access_token', jwt, {
      httpOnly: true,
      secure: false, // Set to true for https only
      maxAge: 3600 * 1000
    });

    return res;
  }

  @Post('regular/verify')
  async verifyRegularAuthentication(@Body() requestBody: RegularAuthenticationCredentials) {
    return await this.authService.verifyRegularAuthentication(requestBody);
  }

  @Get('salt/:user')
  async getSalt(@Param('user') user: string) {
    return await this.authService.getSalt(user);
  }
}
