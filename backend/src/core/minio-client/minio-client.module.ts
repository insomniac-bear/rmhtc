import { Module } from '@nestjs/common';
import { MinioModule } from 'nestjs-minio-client';
import { MinioClientService } from './minio-client.service';

@Module({
  imports: [
    MinioModule.register({
      endPoint: process.env.STORAGE_DEV_ROUTE,
      useSSL: true,
      accessKey: process.env.STORAGE_USER,
      secretKey: process.env.STORAGE_PASSWORD,
    }),
  ],
  providers: [MinioClientService],
  exports: [MinioClientService],
})
export class MinioClientModule {}
