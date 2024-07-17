import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    getAllTasks(): Promise<Task[]>;
    getTask(id: number): Promise<Task>;
    createTask(createTaskDto: CreateTaskDto): Promise<Task>;
    updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<void>;
    deleteTask(id: number): Promise<void>;
}
