import { Injectable } from '@nestjs/common';
import { AuthenticationResponse } from 'src/types/AuthenticationResponse';
import { CreateAccountPayload } from 'src/types/CreateAccountPayload';
import { RegularAuthenticationCredentials } from 'src/types/RegularAuthenticationCredentials';

@Injectable()
export class AccountService {
  constructor() {}

  async createAccount(payload: CreateAccountPayload): Promise<boolean> {
    return new Promise<boolean>(res => res(true));
  }
}
