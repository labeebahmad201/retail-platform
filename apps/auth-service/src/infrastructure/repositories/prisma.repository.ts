import { Injectable } from "@nestjs/common";
import { IUserRepository } from "src/domain/repositories/user.repository.interface";
import { User, UserRole } from "src/domain/entities/user.entity";
import { UserAlreadyExistsException } from "src/domain/exceptions/user-already-exists.exception";
import { PrismaService } from "../prisma/prisma.service";
import { User as PrismaUser } from "./../prisma/generated/client"

@Injectable()
export class PrismaRepository implements IUserRepository { // be sure to implement the interface and not the Symbol this is used for binding in the provider 

    constructor(private readonly prisma: PrismaService) { }

    async save(user: User): Promise<User> {
        try {
            const model = await this.prisma.user.create({ data: user });
            return this.mapToDomain(model);
        } catch (error: any) {
            // P2002 is the Prisma error code for Unique Constraint Violation
            if (error.code === 'P2002') {
                throw new UserAlreadyExistsException(user.email);
            }
            throw error;
        }
    }

    async findByEmail(email: string): Promise<User | null> {
        const model = await this.prisma.user.findUnique({ where: { email } });
        return model ? this.mapToDomain(model) : null;
    }

    async findById(id: string): Promise<User | null> {
        const model = await this.prisma.user.findUnique({ where: { id } });
        return model ? this.mapToDomain(model) : null;
    }

    async delete(id: string): Promise<void> {
        await this.prisma.user.delete({ where: { id } });
    }

    /**
     * Maps a Prisma User model to a Domain User entity.
     * @param user - The Prisma User model to map.
     * @returns The mapped Domain User entity.
     * I didn't put it inside the interface because it's not a part of the 
     * contract. It's a detail of the implementation.
     * If we would have gone that route then domain would know about infra which 
     * is violation of the clean architecture.
     * And it would problematic when we have to swap out infrastructure.
     */
    private mapToDomain(user: PrismaUser): User {
        return new User(
            user.id,
            user.email,
            user.password,
            user.firstName,
            user.lastName,
            user.role as UserRole,
            user.createdAt,
            user.updatedAt,
        );
    }
}