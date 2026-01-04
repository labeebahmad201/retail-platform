
import { Injectable, Inject } from "@nestjs/common"
import type { IUserRepository } from 'src/domain/repositories/user.repository.interface';
import { IUSER_REPOSITORY } from 'src/domain/repositories/user.repository.interface'
import { User } from 'src/domain/entities/user.entity'

@Injectable()
export class ValidateUserUseCase {

    constructor(
        @Inject(IUSER_REPOSITORY) private readonly userRepo: IUserRepository
    ) { }

    async execute(userId: string): Promise<User | null> {

        /***
         * This will peform user verification from the DB,
         * since that is expensive, we don't do it at every request,
         * but we will do it when we are perfoming critical actions
         * like checkout etc.
         */

        return await this.userRepo.findById(userId)
    }
}