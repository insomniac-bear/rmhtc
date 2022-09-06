import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { JwtPayload } from 'src/auth/types';
import { OfferCategory } from 'src/category/entity/offer-category.entity';
import {
  CATEGORY_REPOSITORY,
  CHARACTERISTIC_REPOSITORY,
  OFFER_PHOTO_REPOSITORY,
  OFFER_REPOSITORY,
  OFFER_TYPE_REPOSITORY,
} from 'src/core/constants';
import { CreateOfferDto } from './dto/create-offer.dto';
import { Characteristic } from './entity/characteristic.entity';
import { OfferPhoto } from './entity/offer-photo.entity';
import { OfferType } from './entity/offer-type.entity';
import { Offer } from './entity/offer.entity';

@Injectable()
export class OfferService {
  constructor(
    @Inject(OFFER_REPOSITORY)
    private readonly offerEntity: typeof Offer,
    @Inject(OFFER_PHOTO_REPOSITORY)
    private readonly offerPhotoEntity: typeof OfferPhoto,
    @Inject(OFFER_TYPE_REPOSITORY)
    private readonly offerTypeEntity: typeof OfferType,
    @Inject(CATEGORY_REPOSITORY)
    private readonly offerCategoryEntity: typeof OfferCategory,
    @Inject(CHARACTERISTIC_REPOSITORY)
    private readonly characteristicEntity: typeof Characteristic,
    @Inject(AuthService)
    private readonly authService: AuthService
  ) {}

  async getOfferTypes() {
    return {
      status: 'success',
      offerTypes: await this.offerTypeEntity.findAll(),
    };
  }

  async createOfferType(
    accessTokenPayload: JwtPayload,
    res: Response,
    newOfferType: string
  ) {
    const { sub, role, email } = accessTokenPayload;

    const candidate = await this.offerTypeEntity.findOne({
      where: {
        value: newOfferType,
      },
    });

    if (candidate) {
      throw new HttpException(
        `Offer type ${newOfferType} already exist`,
        HttpStatus.BAD_REQUEST
      );
    }

    await this.offerTypeEntity.create({
      value: newOfferType,
    });

    const { accessToken, refreshToken } = await this.authService.getTokens(
      sub,
      email,
      role
    );

    res.cookie('refreshToken', refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: 'lax',
    });

    return {
      status: 'success',
      accessToken,
      offerTypes: await this.offerTypeEntity.findAll(),
    };
  }

  async updateOfferType(
    accessTokenPayload: JwtPayload,
    res: Response,
    offerTypeUuid,
    newOfferTypeValue
  ) {
    const { sub, role, email } = accessTokenPayload;

    const candidate = await this.offerTypeEntity.findByPk(offerTypeUuid);

    if (!candidate.uuid) {
      throw new HttpException('Offer type not found', HttpStatus.BAD_REQUEST);
    }

    await candidate.update({ value: newOfferTypeValue });

    const { accessToken, refreshToken } = await this.authService.getTokens(
      sub,
      email,
      role
    );

    res.cookie('refreshToken', refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: 'lax',
    });

    return {
      status: 'success',
      accessToken,
      offerTypes: await this.offerTypeEntity.findAll(),
    };
  }

  async createOffer(
    accessTokenPayload: JwtPayload,
    res: Response,
    data: CreateOfferDto
  ) {
    const {
      name,
      price,
      priceComment,
      description,
      currencyUuid,
      companyUuid,
      offerTypeUuid,
    } = data;
    const { sub, role, email } = accessTokenPayload;

    const newOffer = await this.offerEntity.create({
      name,
      price,
      priceComment,
      description,
      currencyUuid,
      offerTypeUuid,
      companyUuid,
      userUuid: sub,
    });

    if (data.characteristics.length > 0) {
      data.characteristics.map((characteristic) => {
        this.characteristicEntity.create({
          ...characteristic,
          offerUuid: newOffer.uuid,
        });
      });
    }

    await newOffer.$set('categories', data.categoryUuidList);

    const { accessToken, refreshToken } = await this.authService.getTokens(
      sub,
      email,
      role
    );

    res.cookie('refreshToken', refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: 'lax',
    });

    return {
      status: 'success',
      accessToken,
      offer: await this.offerEntity.findByPk(newOffer.uuid, {
        include: { all: true },
      }),
    };
  }
}
