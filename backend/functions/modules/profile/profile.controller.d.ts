import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateUsernameDto } from './dto/update-username.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    getProfile(req: any): Promise<import("../user/user.entity").User>;
    updateProfile(req: any, profileData: UpdateProfileDto): Promise<import("../user/user.entity").User>;
    updateUsername(req: any, usernameDto: UpdateUsernameDto): Promise<import("../user/user.entity").User>;
    updatePassword(req: any, passwordDto: UpdatePasswordDto): Promise<void>;
    deleteProfile(req: any): Promise<void>;
}
