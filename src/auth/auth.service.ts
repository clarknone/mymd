import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto, SignUpDto } from './dto/create-auth.dto';
import { AuthUser, AuthTestData } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  async signUp(signUpDto: SignUpDto) {
    let user = signUpDto as AuthUser;
    const isExist = await this.getUserFromDto(user);
    user.password = await this.hashData(user.password);

    if (!isExist) {
      const newUser = await this.prisma.user.create({
        data: { email: user.email, password: user.password },
      });
      const token = this.signUser(user);
      return { message: 'welcome', access_token: token };
    }
    throw new BadRequestException('email exist');
  }

  async signIn(signInDto: SignInDto) {
    const testuser = await this.getUserFromDto(signInDto);
    if (testuser?.email) {
      const passwordMatch = await bcrypt.compare(
        signInDto.password,
        testuser.password,
      );
      if (passwordMatch) {
        const token = this.signUser(testuser);
        return { message: 'success', access_token: token };
      }
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  signUser(user: AuthUser | undefined) {
    return this.jwtService.sign({ email: user.email, type: 'user' });
  }

  async getUserFromDto(
    dto: SignInDto | SignUpDto,
  ): Promise<AuthUser | undefined> {
    let response: AuthUser | undefined;
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    response = user as AuthUser;
    return response;
  }

  async hashData(data: string) {
    return bcrypt.hash(data, 10);
  }
}
