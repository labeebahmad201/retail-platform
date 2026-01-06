import { Controller, Body, ValidationPipe, Post, HttpCode, HttpStatus, UseGuards, Request, Get } from '@nestjs/common';
import { RegisterUserUseCase } from '../application/use-cases/register-user.use-case';
import { LoginUserUseCase } from '../application/use-cases/login-user.use-case';
import { ValidateUserUseCase } from '../application/use-cases/validate-user.use-case';
import { LoginUserDto } from '../application/dtos/login-user.dto';
import { RegisterUserDto } from '../application/dtos/register-user.dto';
import { JwtAuthGuard } from '../infrastructure/security/jwt-auth.guard';


@Controller('auth')
export class AuthController {

    constructor(
        private readonly registerUserUseCase: RegisterUserUseCase,
        private readonly loginUserUseCase: LoginUserUseCase,
        private readonly validateUserUseCase: ValidateUserUseCase,
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

    /**
     * Why do we need the /me endpoint? (The "Stateful Bridge")
     * 
     * 1. STATEFUL VALIDATION: While JWTs are stateless and fast, they can be "stale."
     *    If a user is banned in the DB, their JWT will still be "valid" until it expires.
     *    By calling /me, we force a DB lookup via validateUserUseCase to ensure the user is still active.
     * 
     * 2. DATA REFRESH: It allows the frontend to retrieve the latest profile info (firstName, role)
     *    without needing to store large amounts of data in the JWT itself (reducing token bloat).
     * 
     * 3. SENSITIVE GUARD: It acts as the "Gatekeeper" before critical actions (Checkout, Admin access).
     */
    @UseGuards(JwtAuthGuard)
    @Get('me')
    async me(@Request() req) {
        const user = await this.validateUserUseCase.execute(req.user.id);

        if (!user) {
            return null;
        }

        // STATEFUL BLOCK: If the user is banned/suspended, reject the request even with a valid JWT
        if (user.status !== 'ACTIVE') {
            return {
                status: user.status,
                message: `Account is ${user.status.toLowerCase()}`,
                authenticated: false
            };
        }

        // Sanitization: Remove password
        const { password, ...sanitizedUser } = user;
        return sanitizedUser;
    }
}
