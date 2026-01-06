export interface ITokenService {
    generateToken(userId: string, email: string, role: string): Promise<string>;
}

export const ITOKEN_SERVICE = 'ITokenService';
