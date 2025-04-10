import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRoleEntity } from './entities/user-role.entity';
import { UserAuthEntity } from './entities/user-auth';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRoleEntity)
    private readonly userRoleRepository: Repository<UserRoleEntity>,

    @InjectRepository(UserAuthEntity)
    private readonly userAuthRepository: Repository<UserAuthEntity>,

    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    const user = await this.userAuthRepository.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const tokens = await this.getTokens(user.id);

    return tokens;
  }

  async refreshToken(id: number) {
    const user = await this.userAuthRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new UnauthorizedException('Usuario no válido');
    }
    const tokens = await this.getTokens(user.id);

    return tokens;
  }

  async getTokens(id: number) {
    const payload = { sub: id };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION,
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION,
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  async register(username: string, password: string) {
    const existing = await this.userAuthRepository.findOneBy({
      username,
    });
    if (existing) {
      throw new ConflictException('Usuario ya existe');
    }

    const hash = await bcrypt.hash(password, 10);

    const userAuth = this.userAuthRepository.create({
      username: username,
      passwordHash: hash,
      role: {
        id: 2,
      },
    });

    try {
      const saved = await this.userAuthRepository.save(userAuth);
      if (!saved?.id) {
        throw new Error('No se pudo guardar el usuario');
      }
      return saved;
    } catch (error) {
      throw new InternalServerErrorException('No se pudo guardar el usuario');
    }
  }
}
