import { Injectable } from '@nestjs/common';
import { AuthenticationResponse } from 'src/types/AuthenticationResponse';
import { RegularAuthenticationCredentials } from 'src/types/RegularAuthenticationCredentials';

@Injectable()
export class AuthService {
  constructor() {}

  async verifyGoogleAuthentication(credential: string): Promise<AuthenticationResponse> {
    return new Promise<AuthenticationResponse>(res => res({ success: true, token: '' }));
  }

  async verifyRegularAuthentication(credentials: RegularAuthenticationCredentials): Promise<AuthenticationResponse> {
    return new Promise<AuthenticationResponse>(res => res({ success: true, token: '' }));
  }

  async getSalt(user: string): Promise<string> {
    return new Promise<string>(res => res('x12h34'));
  }
}
