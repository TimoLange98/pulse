import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AuthService } from "src/services/auth.service";
import { AuthenticationResponse } from "src/types/AuthenticationResponse";
import { RegularAuthenticationCredentials } from "src/types/RegularAuthenticationCredentials";

@Controller('auth')
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Post('google/verify')
  async verifyGoogleAuthentication(@Body() requestBody: {credentials: string}) : Promise<AuthenticationResponse> {
    return await this.authService.verifyGoogleAuthentication(requestBody.credentials);
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