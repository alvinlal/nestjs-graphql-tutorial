import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../users/entities/User.entity';
import { AuthService } from './auth.service';
import { LoginUserInput } from './dto/login-user.input';
import LocalAuthGuard from './guards/LocalAuth.guard';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Ctx } from '../types/Ctx';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  @Mutation(() => User)
  @UseGuards(LocalAuthGuard)
  login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() ctx: Ctx,
  ) {
    // put jwt token to cookie
    const jwtToken = this.jwtService.sign({
      email: ctx.user.email,
      sub: ctx.user.id,
    });
    ctx.res.cookie('ACCESS_TOKEN', jwtToken, {
      httpOnly: true,
      maxAge: 2160000000,
      secure: true,
      sameSite:
        this.configService.get('NODE_ENV') === 'production' ? 'lax' : 'none',
    });
    return ctx.user;
  }
}
