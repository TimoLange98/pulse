import { Module } from '@nestjs/common';
import { AccountController } from './account/account.controller';
import { AccountService } from './account/account.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProjectModule } from './project/project.module';
import { ProjectService } from './project/project.service';
import { ProjectController } from './project/project.controller';

@Module({
  imports: [DbModule, AuthModule, ConfigModule.forRoot({isGlobal: true}), ProjectModule],
  controllers: [AccountController, AuthController, ProjectController],
  providers: [AccountService, AuthService, ProjectService]
})
export class AppModule {}
