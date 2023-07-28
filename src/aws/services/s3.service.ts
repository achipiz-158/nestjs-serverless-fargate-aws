import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import config from '../../config';
import { v4 as uuid } from 'uuid';

@Injectable()
export class S3Service {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  async uploadFile(dataBuffer: Buffer, type: string, directory: string) {
    const s3 = new S3();
    const params = {
      Bucket: this.configService.aws.bucketName,
      Key: `${directory}/${uuid()}.${type}`,
      Body: dataBuffer,
    };
    return await s3.upload(params).promise();
  }

  async deleteFile(key: string) {
    const s3 = new S3();
    const params = {
      Bucket: this.configService.aws.bucketName,
      Key: key,
    };
    return await s3.deleteObject(params).promise();
  }
}
