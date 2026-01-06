import 'dotenv/config' // necessary for infrastructure to access env variables
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './presentation/auth.controller';

// Use Cases
import { RegisterUserUseCase } from './application/use-cases/register-user.use-case';
import { LoginUserUseCase } from './application/use-cases/login-user.use-case';
import { ValidateUserUseCase } from './application/use-cases/validate-user.use-case';

// Infrastructure
import { PrismaService } from './infrastructure/prisma/prisma.service';
import { PrismaRepository } from './infrastructure/repositories/prisma.repository';
import { BcryptHasher } from './infrastructure/security/bcrypt-hasher';
import { JwtTokenService } from './infrastructure/security/jwt-token.service';
import { JwtStrategy } from './infrastructure/security/jwt.strategy';
import { JwtAuthGuard } from './infrastructure/security/jwt-auth.guard';

// Domain Interfaces
import { IUSER_REPOSITORY } from './domain/repositories/user.repository.interface';
import { IPASSWORD_HASHER } from './domain/services/password-hasher.interface';
import { ITOKEN_SERVICE } from './application/ports/token-service.interface';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2h' }, // Increased for dev comfort
    }),
  ],
  controllers: [AppController, AuthController],
  providers: [
    AppService,
    RegisterUserUseCase,
    LoginUserUseCase,
    ValidateUserUseCase,
    PrismaService,
    JwtStrategy,
    JwtAuthGuard,
    {
      provide: IUSER_REPOSITORY,
      useClass: PrismaRepository,
    },
    {
      provide: IPASSWORD_HASHER,
      useClass: BcryptHasher,
    },
    {
      provide: ITOKEN_SERVICE,
      useClass: JwtTokenService,
    },
  ],
})
export class AppModule { }
