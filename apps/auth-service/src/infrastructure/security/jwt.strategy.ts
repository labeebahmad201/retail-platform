import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'super-secret', // Replace with environment variable in production
        });
    }

    async validate(payload: any) {
        // Stateless verification: Just return the payload data
        // Sensitive actions will use a separate Stateful check (ValidateUserUseCase)
        return { id: payload.sub };
    }
}
