import { User } from "../entities/user.entity"

export interface IUserRepository {
    save(user: User): Promise<User>
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    delete(id: string): Promise<void>;
}

// this generates a unique symbol for the DI by infrastructure
export const IUSER_REPOSITORY = Symbol('IUSER_REPOSITORY') 
