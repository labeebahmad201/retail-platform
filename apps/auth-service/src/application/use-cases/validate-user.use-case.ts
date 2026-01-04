import { Inject, Injectable } from "@nestjs/common";
import { IUSER_REPOSITORY } from "../../domain/repositories/user.repository.interface";
import type { IUserRepository } from "../../domain/repositories/user.repository.interface";
import { User } from "../../domain/entities/user.entity";

@Injectable()
export class ValidateUserUseCase {
    constructor(
        @Inject(IUSER_REPOSITORY) private readonly userRepo: IUserRepository,
    ) { }

    async execute(userId: string): Promise<User | null> {
        /**
         * SENSITIVE ACTION CHECK (Stateful)
         * Even if browsing is stateless, we use this use case for critical actions
         * (Checkout, Password Change) to ensure the user is still active in the DB.
         */
        return await this.userRepo.findById(userId);
    }
}
