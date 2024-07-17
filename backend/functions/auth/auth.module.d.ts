import { PassportSerializer } from '@nestjs/passport';
import { AuthService } from './auth.service';
export declare class SessionSerializer extends PassportSerializer {
    private readonly authService;
    constructor(authService: AuthService);
    serializeUser(user: any, done: (err: Error, user: any) => void): void;
    deserializeUser(id: any, done: (err: Error, user: any) => void): Promise<void>;
}
export declare class AuthModule {
}
