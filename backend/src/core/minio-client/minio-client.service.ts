import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { BufferedFile } from './types/minio.interface';
import * as crypto from 'crypto';

@Injectable()
export class MinioClientService {
  private readonly logger: Logger;
  private readonly baseBucket = process.env.STORAGE_PUBLIC_BUCKET;

  public get client() {
    return this.minio.client;
  }

  constructor(
    private readonly minio: MinioService,
  ) {
    this.logger = new Logger('MinioStorageService');
  }

  public async upload(path: string, file: BufferedFile, baseBucket: string = this.baseBucket) {
    if (!(file.mimetype.includes('jpeg') || file.mimetype.includes('png') || file.mimetype.includes('svg') || file.mimetype.includes('webp') || file.mimetype.includes('pdf'))) throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST);

    const tempFilename = Date.now().toString();
    const hashedFileName = crypto
      .createHash('md5')
      .update(tempFilename)
      .digest('hex');
    const ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);

    const fileName:string = path + hashedFileName + ext;
    const fileBuffer = file.buffer;

    this.client.putObject(baseBucket, fileName, fileBuffer, (err, _res) => {
      if (err) throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST);
    });

    return `https://${process.env.STORAGE_DEV_ROUTE}/${baseBucket}/${fileName}`
  }

  public async delete(path: string, objectName: string, baseBucket: string = this.baseBucket) {
    this.client.removeObject(baseBucket, `${path}${objectName}`, (err) => {
      if (err) throw new HttpException('Oooops! Something wrong happened!', HttpStatus.BAD_REQUEST);
    });
  }
}
