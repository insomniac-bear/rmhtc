import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from './roles-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    try {
      const authorization = req.headers.authorization;
      const bearer = authorization.split(' ')[0];
      const accessToken = authorization.split(' ')[1];

      if (bearer !== 'Bearer' || !accessToken)
        throw new UnauthorizedException({ message: 'jwt expired' });

      const user = this.jwtService.verify(accessToken, {
        secret: process.env.JWT_ACCESS_SECRET,
      });

      console.log(user);
      return requiredRoles.includes(user.role);
    } catch (err) {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        res.clearCookie('refreshToken');
        throw new UnauthorizedException({ message: 'jwt expired' });
      }

      const user = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      if (user) {
        console.log(user);
        return requiredRoles.includes(user.role);
      } else {
        throw new HttpException('Not enought rights', HttpStatus.FORBIDDEN);
      }
    }
  }
}
