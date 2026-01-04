import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ITokenService } from "../../application/ports/token-service.interface";

@Injectable()
export class JwtTokenService implements ITokenService {
    constructor(private readonly jwtService: JwtService) { }

    /**
     * Generates a JWT token for a user.
     * @param userId - The ID of the user to generate a token for.
     * @returns A Promise that resolves to the generated JWT token.
     */
    async generateToken(userId: string): Promise<string> {
        const payload = { sub: userId };
        return await this.jwtService.signAsync(payload);
    }
}