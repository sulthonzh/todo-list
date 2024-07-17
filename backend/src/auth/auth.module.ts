import { Module, Injectable } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule, PassportSerializer } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserModule } from '../modules/user/user.module';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly authService: AuthService) {
    super();
  }

  serializeUser(user: any, done: (err: Error, user: any) => void): void {
    done(null, user.id);
  }

  async deserializeUser(id: any, done: (err: Error, user: any) => void): Promise<void> {
    const user = await this.authService.findById(id);
    done(null, user);
  }
}

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'secretKey', // Replace with a secure key
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, SessionSerializer],
  exports: [AuthService],
})
export class AuthModule {}
