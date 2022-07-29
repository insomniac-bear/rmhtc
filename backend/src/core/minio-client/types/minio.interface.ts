export type TAppMime = 'image/png' | 'image/jpeg' | 'application/pdf' | 'image/svg+xml' | 'image/webp';

export interface BufferedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: TAppMime;
  size: number;
  buffer: Buffer | string;
}

export interface HasFile {
  file: Buffer | string;
}

export interface StoredFileMetadata {
  uuid: string;
  name: string;
  encoding: string;
  mimetype: TAppMime;
  size: number;
  updatedAt: Date;
  fileSrc?: string;
}

export interface StoredFile extends HasFile, StoredFileMetadata {}