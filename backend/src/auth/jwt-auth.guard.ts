import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
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

      req.user = user;
      return true;
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
        req.user = user;
        return true;
      } else throw new UnauthorizedException({ message: 'jwt expired' });
    }
  }
}
