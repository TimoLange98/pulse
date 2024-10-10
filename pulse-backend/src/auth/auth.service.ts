import { Inject, Injectable } from '@nestjs/common';
import { GOOGLE_CLIENT_ID, PG_CONNECTION } from 'src/constants';
import { AuthenticationResponse } from 'src/types/AuthenticationResponse';
import { RegularAuthenticationCredentials } from 'src/types/RegularAuthenticationCredentials';
import { Connection } from 'pg';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private oAuth2Client: OAuth2Client;
  constructor(
    @Inject(PG_CONNECTION) private db: Connection,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {
    this.oAuth2Client = new OAuth2Client(GOOGLE_CLIENT_ID);
  }

  async verifyGoogleAuthentication(credential: string): Promise<TokenPayload | null> {
    try {
      const ticket = await this.oAuth2Client.verifyIdToken({
        idToken: credential,
        audience: this.configService.get<string>('GOOGLE_CLIENT_ID')
      });

      const payload = ticket.getPayload();
      return payload;
    } catch (err) {
      console.error('Invalid google token', err);
      return null;
    }
  }

  async verifyRegularAuthentication(credentials: RegularAuthenticationCredentials): Promise<AuthenticationResponse> {
    return new Promise<AuthenticationResponse>(res => res({ success: true }));
  }

  async getSalt(user: string): Promise<string> {
    return new Promise<string>(res => res('x12h34'));
  }

  async generateJwt(id: string, email: string) {
    return this.jwtService.sign({ id, email });
  }
}
