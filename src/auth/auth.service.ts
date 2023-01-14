import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthTable, AuthTestData } from './entities/auth.entity';

function getUserFromDto(dto: SignInDto | SignUpDto): AuthTable | undefined {
  let response: AuthTable | undefined;

  response = AuthTestData.find(
    (user) => user.email === dto.email && user.password === dto.password,
  );
  return response;
}

@Injectable()
export class AuthService {
  signUp(signUpDto: SignUpDto) {
    let user = signUpDto as AuthTable;
    const isExist = getUserFromDto(user);
    if (isExist) {
      AuthTestData.push(user);
      return { message: 'welcome' };
    }
    throw new BadRequestException('email exist');
  }

  signIn(signInDto: SignInDto) {
    const testuser = getUserFromDto(signInDto);
    if (testuser?.email) {
      return { message: 'success' };
    }
    throw new UnauthorizedException('Invalid credentials');
  }
}
