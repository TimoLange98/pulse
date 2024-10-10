import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from 'src/auth/auth.controller';
import { DbModule } from 'src/db/db.module';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' }
      }),
      global: true
    }),
    DbModule
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
