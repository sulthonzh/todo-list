# Mini Task Backend

Welcome to the backend services for Mini Task Backend. This repository contains the backend services developed using NestJS, including user management, task management, and profile management. Below is the detailed documentation for each service.

## Table of Contents

1. [User Service](#user-service)
2. [Task Service](#task-service)
3. [Profile Service](#profile-service)
4. [Authentication](#authentication)
5. [Design Architecture](#design-architecture)

## User Service

### Overview

The User Service is responsible for managing user-related operations, including CRUD operations and user authentication.

### Endpoints

- `GET /api/users`: Get a list of all users
- `GET /api/users/:id`: Get details of a specific user
- `POST /api/users`: Create a new user
- `PUT /api/users/:id`: Update a user's details
- `DELETE /api/users/:id`: Delete a user

### Data Transfer Objects (DTOs)

#### CreateUserDto

```typescript
import { IsString, IsArray, ArrayNotEmpty, ArrayMinSize } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'The username of the user', example: 'johndoe' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'The password of the user', example: 'password123' })
  @IsString()
  password: string;

  @ApiProperty({ description: 'The roles assigned to the user', example: ['user'], isArray: true })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  roles: string[];
}
```

#### UpdateUserDto

```typescript
import { IsString, IsOptional, IsArray, ArrayMinSize } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ description: 'The username of the user', example: 'johndoe', required: false })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({ description: 'The password of the user', example: 'password123', required: false })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({ description: 'The roles assigned to the user', example: ['user'], isArray: true, required: false })
  @IsArray()
  @ArrayMinSize(1)
  @IsOptional()
  roles?: string[];
}
```

## Task Service

### Overview

The Task Service is responsible for managing tasks, including creating, updating, and deleting tasks.

### Endpoints

- `GET /api/tasks`: Get a list of all tasks
- `GET /api/tasks/:id`: Get details of a specific task
- `POST /api/tasks`: Create a new task
- `PUT /api/tasks/:id`: Update a task's details
- `DELETE /api/tasks/:id`: Delete a task

### Data Transfer Objects (DTOs)

#### CreateTaskDto

```typescript
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ description: 'The title of the task', example: 'Buy groceries' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'The description of the task', example: 'Buy milk, eggs, and bread from the store' })
  @IsString()
  description: string;
}
```

#### UpdateTaskDto

```typescript
import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiProperty({ description: 'The title of the task', example: 'Buy groceries', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ description: 'The description of the task', example: 'Buy milk, eggs, and bread from the store', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}
```

## Profile Service

###  Overview

The Profile Service is responsible for managing user profiles, including viewing, updating profile details, updating username, changing password, and soft deleting profiles.

### Endpoints

- `GET /api/profile`: Get the profile of the logged-in user
- `PUT /api/profile`: Update the profile of the logged-in user
- `PUT /api/profile/username`: Update the username of the logged-in user
- `PUT /api/profile/password`: Update the password of the logged-in user
- `DELETE /api/profile`: Soft delete the profile of the logged-in user

### Data Transfer Objects (DTOs)

#### UpdateProfileDto

```typescript
import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiProperty({ description: 'The name of the user', example: 'John Doe', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'The age of the user', example: 30, required: false })
  @IsOptional()
  age?: number;

  @ApiProperty({ description: 'The email of the user', example: 'john.doe@example.com', required: false })
  @IsString()
  @IsOptional()
  email?: string;
}
```

#### UpdateUsernameDto

```typescript
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUsernameDto {
  @ApiProperty({ description: 'The new username of the user', example: 'john.doe' })
  @IsString()
  username: string;
}
```

#### UpdatePasswordDto

```typescript
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @ApiProperty({ description: 'The current password of the user', example: 'currentPassword123' })
  @IsString()
  currentPassword: string;

  @ApiProperty({ description: 'The new password of the user', example: 'newPassword123' })
  @IsString()
  newPassword: string;
}
```

## Authentication

###  Overview

The Authentication module handles user login, registration, and token management.

### Endpoints

POST /api/auth/login: Login a user
POST /api/auth/register: Register a new user
POST /api/auth/refresh: Refresh the access token

### Data Transfer Objects (DTOs)

#### LoginDto

```typescript
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'The username of the user', example: 'johndoe' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'The password of the user', example: 'password123' })
  @IsString()
  password: string;
}
```

#### RegisterDto

```typescript
import { IsString, IsArray, ArrayNotEmpty, ArrayMinSize } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ description: 'The username of the user', example: 'johndoe' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'The password of the user', example: 'password123' })
  @IsString()
  password: string;

  @ApiProperty({ description: 'The roles assigned to the user', example: ['user'], isArray: true })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  roles: string[];
}
```

## Running the Project

### Prerequisites

- Node.js
- Yarn or npm
- Docker (for running the database)

### Installation

#### Install dependencies:

```bash
yarn install
# or
yarn install
```

#### Set up environment variables:

Create a .env file in the root directory and add the following:

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=yourusername
DATABASE_PASSWORD=yourpassword
DATABASE_NAME=yourdatabase
JWT_SECRET=yourjwtsecret
```

#### Run the database using Docker:

```bash
docker-compose up postgres -d
```

#### Run the application:

```bash
yarn start:dev
# or
yarn run start:dev
```

### Testing

#### Run the tests:

```bash
yarn test
# or
yarn test
```

## API Documentation

The API documentation is available at http://localhost:3000/api/docs after running the application.