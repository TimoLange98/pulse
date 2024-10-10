import { Body, Controller, Post } from "@nestjs/common";
import { AccountService } from "src/account/account.service";
import { CreateAccountPayload } from "src/types/CreateAccountPayload";

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post('create')
  async createAccount(@Body() createAccountPayload: CreateAccountPayload): Promise<boolean> {
    return await this.accountService.createAccount(createAccountPayload);
  }
}