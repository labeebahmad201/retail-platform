import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginUserDto } from '../dtos/login-user.dto'
import { User } from "../../domain/entities/user.entity";
import { IUSER_REPOSITORY } from "../../domain/repositories/user.repository.interface";
import type { IUserRepository } from "../../domain/repositories/user.repository.interface";
import { IPASSWORD_HASHER } from "../../domain/services/password-hasher.interface";
import type { IPasswordHasher } from "../../domain/services/password-hasher.interface";
import type { ITokenService } from "../../application/ports/token-service.interface";
import { ITOKEN_SERVICE } from "../../application/ports/token-service.interface";



@Injectable()
export class LoginUserUseCase {

    constructor(
        @Inject(IUSER_REPOSITORY) private readonly userRepo: IUserRepository,
        @Inject(IPASSWORD_HASHER) private readonly passwordHasher: IPasswordHasher,
        @Inject(ITOKEN_SERVICE) private readonly tokenService: ITokenService,
    ) { }

    async execute(dto: LoginUserDto): Promise<{ user: Omit<User, 'password'>, accessToken: string }> {
        const user: User | null = await this.userRepo.findByEmail(dto.email);

        const isValid = user && (await this.passwordHasher.compare(dto.password, user.password));

        if (!isValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const accessToken = await this.tokenService.generateToken(user.id, user.email, user.role);

        // Sanitize: We don't want to send the hash back to the UI!
        const { password, ...userWithoutPassword } = user!;

        return { user: userWithoutPassword, accessToken };
    }


}