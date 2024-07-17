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
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
const bcrypt = require("bcrypt");
let ProfileService = class ProfileService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async getProfile(userId) {
        const user = await this.usersRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async updateProfile(userId, updateProfileDto) {
        const user = await this.usersRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        Object.assign(user, updateProfileDto);
        return this.usersRepository.save(user);
    }
    async updateUsername(userId, updateUsernameDto) {
        const user = await this.usersRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        user.username = updateUsernameDto.username;
        return this.usersRepository.save(user);
    }
    async updatePassword(userId, updatePasswordDto) {
        const { currentPassword, newPassword } = updatePasswordDto;
        const user = await this.usersRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const isPasswordMatching = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordMatching) {
            throw new common_1.UnauthorizedException('Current password is incorrect');
        }
        user.password = await bcrypt.hash(newPassword, 10);
        await this.usersRepository.save(user);
    }
    async deleteProfile(userId) {
        const user = await this.usersRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        user.isActive = false;
        await this.usersRepository.save(user);
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProfileService);
//# sourceMappingURL=profile.service.js.map