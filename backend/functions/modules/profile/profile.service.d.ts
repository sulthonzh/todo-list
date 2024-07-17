import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateUsernameDto } from './dto/update-username.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
export declare class ProfileService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    getProfile(userId: number): Promise<User>;
    updateProfile(userId: number, updateProfileDto: UpdateProfileDto): Promise<User>;
    updateUsername(userId: number, updateUsernameDto: UpdateUsernameDto): Promise<User>;
    updatePassword(userId: number, updatePasswordDto: UpdatePasswordDto): Promise<void>;
    deleteProfile(userId: number): Promise<void>;
}
