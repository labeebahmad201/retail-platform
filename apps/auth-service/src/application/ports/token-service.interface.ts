export interface ITokenService {
    generateToken(userId: string): Promise<string>;
}

export const ITOKEN_SERVICE = 'ITokenService';
