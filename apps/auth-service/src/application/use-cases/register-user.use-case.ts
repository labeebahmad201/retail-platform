import { Inject, Injectable } from "@nestjs/common";
import { RegisterUserDto } from "../dtos/register-user.dto";
import { User } from "../../domain/entities/user.entity";
import { IUSER_REPOSITORY } from "../../domain/repositories/user.repository.interface";
import type { IUserRepository } from "../../domain/repositories/user.repository.interface";
import { IPASSWORD_HASHER } from "src/domain/services/password-hasher.interface";
import type { IPasswordHasher } from "src/domain/services/password-hasher.interface";
import { createId } from "@paralleldrive/cuid2";

@Injectable()
export class RegisterUserUseCase {

    constructor(
        @Inject(IUSER_REPOSITORY) private readonly userRepository: IUserRepository,
        @Inject(IPASSWORD_HASHER) private readonly passwordHasher: IPasswordHasher,
    ) { }

    async execute(dto: RegisterUserDto): Promise<Omit<User, 'password'>> {
        const hashedPassword = await this.passwordHasher.hash(dto.password)

        const newUser = User.create({
            ...dto,
            id: createId(),
            password: hashedPassword,
            role: "USER",
            status: "ACTIVE",
        });

        const savedUser = await this.userRepository.save(newUser);

        // Sanitize: We don't want to send the hash back to the UI!
        const { password, ...userWithoutPassword } = savedUser;

        return userWithoutPassword;
    }
}