"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const common_1 = require("@nestjs/common");
const task_service_1 = require("./task.service");
const create_task_dto_1 = require("./dto/create-task.dto");
const roles_decorator_1 = require("../../auth/roles.decorator");
const roles_guard_1 = require("../../auth/roles.guard");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let TaskController = class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
    }
    getAllTasks() {
        return this.taskService.findAll();
    }
    getTask(id) {
        return this.taskService.findOne(id);
    }
    createTask(createTaskDto) {
        return this.taskService.create(createTaskDto);
    }
    updateTask(id, updateTaskDto) {
        return this.taskService.update(id, updateTaskDto);
    }
    deleteTask(id) {
        return this.taskService.remove(id);
    }
};
exports.TaskController = TaskController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('user', 'admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all tasks' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all tasks.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "getAllTasks", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)('user', 'admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a task by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the task with the given ID.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Task not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "getTask", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('user', 'admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new task' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The task has been successfully created.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_dto_1.CreateTaskDto]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "createTask", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)('user', 'admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an existing task' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The task has been successfully updated.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Task not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_task_dto_1.UpdateTaskDto]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "updateTask", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('user', 'admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a task' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The task has been successfully deleted.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Task not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "deleteTask", null);
exports.TaskController = TaskController = __decorate([
    (0, swagger_1.ApiTags)('tasks'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('tasks'),
    __metadata("design:paramtypes", [task_service_1.TaskService])
], TaskController);
//# sourceMappingURL=task.controller.js.map