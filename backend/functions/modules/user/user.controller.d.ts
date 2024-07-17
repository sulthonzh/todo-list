import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUsers(): Promise<User[]>;
    getUser(id: number): Promise<User>;
    createUser(createUserDto: CreateUserDto): Promise<User>;
    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<void>;
    deleteUser(id: number): Promise<void>;
}
