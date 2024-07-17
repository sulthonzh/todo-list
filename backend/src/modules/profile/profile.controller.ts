import { Controller, Get, Put, Body, UseGuards, Request, Delete } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateUsernameDto } from './dto/update-username.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@ApiTags('profile')
@ApiBearerAuth('access-token') // Ensure this matches the name used in DocumentBuilder
@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, description: 'Return user profile.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async getProfile(@Request() req) {
    return this.profileService.getProfile(req.user.id);
  }

  @Put()
  @ApiOperation({ summary: 'Update user profile' })
  @ApiResponse({ status: 200, description: 'Profile updated successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async updateProfile(@Request() req, @Body() profileData: UpdateProfileDto) {
    return this.profileService.updateProfile(req.user.id, profileData);
  }

  @Put('username')
  @ApiOperation({ summary: 'Update username' })
  @ApiResponse({ status: 200, description: 'Username updated successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async updateUsername(@Request() req, @Body() usernameDto: UpdateUsernameDto) {
    return this.profileService.updateUsername(req.user.id, usernameDto);
  }

  @Put('password')
  @ApiOperation({ summary: 'Update password' })
  @ApiResponse({ status: 200, description: 'Password updated successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 401, description: 'Current password is incorrect.' })
  async updatePassword(@Request() req, @Body() passwordDto: UpdatePasswordDto) {
    return this.profileService.updatePassword(req.user.id, passwordDto);
  }

  @Delete()
  @ApiOperation({ summary: 'Soft delete user profile' })
  @ApiResponse({ status: 200, description: 'The profile has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async deleteProfile(@Request() req) {
    return this.profileService.deleteProfile(req.user.id);
  }
}
