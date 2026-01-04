import { Controller, Body, ValidationPipe, Post, HttpCode, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { RegisterUserUseCase } from '../application/use-cases/register-user.use-case';
import { LoginUserUseCase } from '../application/use-cases/login-user.use-case';
import { LoginUserDto } from '../application/dtos/login-user.dto';
import { RegisterUserDto } from '../application/dtos/register-user.dto';
import { JwtAuthGuard } from '../infrastructure/security/jwt-auth.guard';


@Controller('auth')
export class AuthController {

    constructor(
        private readonly registerUserUseCase: RegisterUserUseCase,
        private readonly loginUserUseCase: LoginUserUseCase,
    ) { }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body(ValidationPipe) dto: LoginUserDto) {
        return await this.loginUserUseCase.execute(dto);
    }

    @Post('register')
    async register(@Body(ValidationPipe) dto: RegisterUserDto) {
        return await this.registerUserUseCase.execute(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('verify')
    @HttpCode(HttpStatus.OK)
    async verify(@Request() req) {
        return req.user;
    }
}
