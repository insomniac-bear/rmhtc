import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { Op } from 'sequelize';
import { AuthService } from 'src/auth/auth.service';
import { JwtPayload } from 'src/auth/types';
import {
  CHARACTERISTIC_REPOSITORY,
  OFFER_PHOTO_REPOSITORY,
  OFFER_REPOSITORY,
  OFFER_TYPE_REPOSITORY,
} from 'src/core/constants';
import { ModerationService } from 'src/moderation/moderation.service';
import { createUserOfferResponse } from './dto';
import { CreateOfferDto } from './dto/create-offer.dto';
import { Characteristic } from './entity/characteristic.entity';
import { OfferPhoto } from './entity/offer-photo.entity';
import { OfferType } from './entity/offer-type.entity';
import { Offer } from './entity/offer.entity';
import { fieldsForUserResponse } from './entity/query-options';

@Injectable()
export class OfferService {
  constructor(
    @Inject(OFFER_REPOSITORY)
    private readonly offerEntity: typeof Offer,
    @Inject(OFFER_PHOTO_REPOSITORY)
    private readonly offerPhotoEntity: typeof OfferPhoto,
    @Inject(OFFER_TYPE_REPOSITORY)
    private readonly offerTypeEntity: typeof OfferType,
    @Inject(CHARACTERISTIC_REPOSITORY)
    private readonly characteristicEntity: typeof Characteristic,
    @Inject(AuthService)
    private readonly authService: AuthService,
    @Inject(ModerationService)
    private readonly moderationService: ModerationService
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
    data: CreateOfferDto,
    isPublish = false
  ) {
    const {
      name,
      price,
      amount,
      unit,
      description,
      currencyUuid,
      companyUuid,
      offerTypeUuid,
    } = data;
    const { sub, role, email } = accessTokenPayload;

    const candidate = await this.offerEntity.findOne({
      where: {
        name,
      },
    });

    if (!!candidate) {
      throw new HttpException(
        `Offer with name ${name} already exist`,
        HttpStatus.BAD_REQUEST
      );
    }

    const moderationNote = await this.moderationService.createModerationNote();

    const newOffer = await this.offerEntity.create({
      name,
      price,
      amount,
      unit,
      description,
      moderated: isPublish ? 'pending' : 'idle',
      currencyUuid,
      offerTypeUuid,
      companyUuid,
      moderationUuid: moderationNote.uuid,
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

    const userOffers = await this.offerEntity.findByPk(newOffer.uuid, {
      include: fieldsForUserResponse,
    });

    return {
      status: 'success',
      accessToken,
      offer: createUserOfferResponse(userOffers),
    };
  }

  async getUsersOfferCounts(userUuid) {
    const offerCount = await this.offerEntity.count({
      where: { userUuid },
    });

    const moderatedOfferCount = await this.offerEntity.count({
      where: {
        [Op.and]: [{ userUuid }, { moderated: 'success' }],
      },
    });

    const idleModeratedOfferCount = await this.offerEntity.count({
      where: {
        [Op.and]: [{ userUuid }, { moderated: 'pending' }],
      },
    });

    const failedOfferCount = await this.offerEntity.count({
      where: {
        [Op.and]: [{ userUuid }, { moderated: 'failed' }],
      },
    });

    return {
      offerCount,
      moderatedOfferCount,
      idleModeratedOfferCount,
      failedOfferCount,
    };
  }
}
