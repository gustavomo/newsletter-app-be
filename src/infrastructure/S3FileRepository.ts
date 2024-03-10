import { S3 } from 'aws-sdk';

import { FileRepository } from '../domain/FileRespository';

import config from '../shared/config';

class S3FileRepository implements FileRepository {
  private s3: S3;

  constructor() {
    this.s3 = new S3({
      region: config.AWS_REGION,
      accessKeyId: config.AWS_ACCESS_KEY_ID,
      secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    });
  }

  public async uploadFile(file: Express.Multer.File, key: string): Promise<string> {
    try {
      const params: S3.Types.PutObjectRequest = {
        Bucket: config.BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      const result = await this.s3.upload(params).promise();

      return result.Location;
    }
    catch (error) {
      throw error;
    }
  }
}

export default S3FileRepository;
