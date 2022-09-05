import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { JwtPayload } from 'src/auth/types';
import { CURRENCY_REPOSITORY } from 'src/core/constants';
import { Currency } from './entity/currency.entity';

@Injectable()
export class CurrencyService {
  constructor(
    @Inject(CURRENCY_REPOSITORY)
    private readonly currencyEntity: typeof Currency,
    @Inject(AuthService)
    private readonly authService: AuthService
  ) {}

  async getCurrencies() {
    const currencies = await this.currencyEntity.findAll();

    return {
      status: 'success',
      currencies,
    };
  }

  async createCurrency(
    accessTokenPayload: JwtPayload,
    res: Response,
    newCurrency: string
  ) {
    const { sub, role, email } = accessTokenPayload;

    const candidate = await this.currencyEntity.findOne({
      where: {
        value: newCurrency,
      },
    });

    if (candidate) {
      throw new HttpException(
        `Currency ${newCurrency} already exist`,
        HttpStatus.BAD_REQUEST
      );
    }

    await this.currencyEntity.create({
      value: newCurrency,
    });

    const { accessToken, refreshToken } = await this.authService.getTokens(
      sub,
      email,
      role
    );

    res.cookie('refreshToken', refreshToken, {
      maxAge: 1000 * 60 * 60 * 7,
      httpOnly: true,
      sameSite: 'lax',
    });

    return {
      status: 'success',
      accessToken,
      currencies: await this.currencyEntity.findAll(),
    };
  }

  async updateCurrency(
    accessTokenPayload: JwtPayload,
    res: Response,
    currencyUuid,
    newCurrencyValue
  ) {
    const { sub, role, email } = accessTokenPayload;

    const candidate = await this.currencyEntity.findByPk(currencyUuid);

    if (!candidate.uuid) {
      throw new HttpException('Currency not found', HttpStatus.BAD_REQUEST);
    }

    await candidate.update({ value: newCurrencyValue });

    const { accessToken, refreshToken } = await this.authService.getTokens(
      sub,
      email,
      role
    );

    res.cookie('refreshToken', refreshToken, {
      maxAge: 1000 * 60 * 60 * 7,
      httpOnly: true,
      sameSite: 'lax',
    });

    return {
      status: 'success',
      accessToken,
      currencies: await this.currencyEntity.findAll(),
    };
  }
}
