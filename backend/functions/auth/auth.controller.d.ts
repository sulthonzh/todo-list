import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto, req: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    register(registerDto: RegisterDto): Promise<import("../modules/user/user.entity").User>;
    refresh(refreshToken: string): Promise<{
        access_token: string;
    }>;
}
