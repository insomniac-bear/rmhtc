import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { MODERATION_REPOSITORY } from 'src/core/constants';
import { Moderation } from './entity/moderation.entity';

@Injectable()
export class ModerationService {
  constructor(
    @Inject(MODERATION_REPOSITORY)
    private readonly moderationEntity: typeof Moderation
  ) {}

  async createModerationNote(): Promise<Moderation> {
    const moderationNote = await this.moderationEntity.create({
      reason: null,
      authorUuid: null,
    });

    return moderationNote;
  }

  async updateModerationNote(
    uuid: string,
    reason: string,
    authorUuid: string
  ): Promise<Moderation> {
    const moderationNote = await this.moderationEntity.findByPk(uuid);

    if (!moderationNote) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    await moderationNote.update({
      reason,
      authorUuid,
    });

    return await moderationNote.get();
  }
}
