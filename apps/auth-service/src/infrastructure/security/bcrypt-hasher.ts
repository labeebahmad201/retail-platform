import { IPASSWORD_HASHER, IPasswordHasher } from "../../domain/services/password-hasher.interface";
import * as bcrypt from 'bcrypt';
import { Injectable } from "@nestjs/common";

@Injectable() // Add this so NestJS can inject this class
export class BcryptHasher implements IPasswordHasher {
    async hash(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    async compare(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
}