import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuthEntity } from './entities/user-auth';
import { UserRoleEntity } from './entities/user-role.entity';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'sonic',
      signOptions: { expiresIn: '4h' },
    }),
    TypeOrmModule.forFeature([UserAuthEntity, UserRoleEntity]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
