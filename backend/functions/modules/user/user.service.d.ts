import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserPublisher } from './user.publisher';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
export declare class UserService {
    private usersRepository;
    private userPublisher;
    constructor(usersRepository: Repository<User>, userPublisher: UserPublisher);
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    findOneByUsername(username: string): Promise<User>;
    create(createUserDto: CreateUserDto): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<void>;
    remove(id: number): Promise<void>;
}
