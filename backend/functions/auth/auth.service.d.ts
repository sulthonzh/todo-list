import { JwtService } from '@nestjs/jwt';
import { UserService } from '../modules/user/user.service';
import { User } from '../modules/user/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(loginDto: LoginDto): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    register(registerDto: RegisterDto): Promise<User>;
    refresh(refreshToken: string): Promise<{
        access_token: string;
    }>;
    findById(id: number): Promise<User>;
}
