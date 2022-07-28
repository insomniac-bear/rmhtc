import { forwardRef, Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { AuthService } from 'src/auth/auth.service';
import { CompanyService } from 'src/company/company.service';
import { USER_REPOSITORY } from 'src/core/constants';
import { RolesService } from 'src/roles/roles.service';
import { dto, UserDto, UserDataDto } from './dto/';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userEntity: typeof User,
    @Inject(forwardRef(() => CompanyService))
    private readonly companyService: CompanyService,
    private readonly rolesService: RolesService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async createUser(userDto: UserDataDto): Promise<UserDto> {
    const user = await this.userEntity.create<User>(userDto);
    const role = await this.rolesService.getRoleByValue('USER');
    user.roleUuid = role.uuid;
    await user.save();
    const savedUser = user.get()
    const counts = await this.companyService.getUsersCompanyCounts(user.uuid);
    const transformUser = dto(savedUser, counts);

    return transformUser;
  }

  async updateUser(uuid, userData: UserDataDto, res) {
    const user = await this.getUserByParam('uuid', uuid);
    if (!user) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    const { accessToken, refreshToken } = await this.authService.getTokens(user.uuid, user.email, user.role);

    const updatedUser = await this.update(uuid, userData);

    await this.authService.saveRefreshToken(uuid, refreshToken);

    res.cookie('refreshToken', refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: 'lax',
    });

    return {
      status: 'success',
      accessToken,
      userData: updatedUser,
    }
  }

  async getAllUsers() {
    const users = await this.userEntity.findAll();
    return users;
  }

  async update(uuid: string, updatedData: UserDataDto): Promise<UserDto> {
    const user = await this.userEntity.findOne({ where: { uuid }, include: { all: true} });
    if (!user) throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);

    await user.update(updatedData);
    const updatedUser = await user.get();

    const counts = await this.companyService.getUsersCompanyCounts(uuid);

    const transformUser = dto(updatedUser, counts);
    return transformUser;
  }

  async compareUserPassword(uuid, password) {
    const user = await this.userEntity.findByPk(uuid);
    return await bcrypt.compare(password, user.password);
  }

  async getUserByParam(param: string, value: string): Promise<UserDto> {
    const rawUser = param === 'uuid'
      ? await this.userEntity.findByPk(value, { include: { all: true} })
      : await this.userEntity.findOne(
        {
          where: {
            [param]: value
          },
          include: {
            all: true
          }
        }
      );

      if (!rawUser) {
        return {};
      }

      const counts = await this.companyService.getUsersCompanyCounts(rawUser.uuid);

    return dto(rawUser, counts);
  }
}
