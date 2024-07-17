import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { TaskPublisher } from './task.publisher';
import { CreateTaskDto, UpdateTaskDto } from './dto/create-task.dto';
export declare class TaskService {
    private tasksRepository;
    private taskPublisher;
    constructor(tasksRepository: Repository<Task>, taskPublisher: TaskPublisher);
    findAll(): Promise<Task[]>;
    findOne(id: number): Promise<Task>;
    create(createTaskDto: CreateTaskDto): Promise<Task>;
    update(id: number, updateTaskDto: UpdateTaskDto): Promise<void>;
    remove(id: number): Promise<void>;
}
