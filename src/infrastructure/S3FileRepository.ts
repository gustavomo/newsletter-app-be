import { S3 } from 'aws-sdk';

import { FileRepository } from '../domain/FileRespository';

class S3FileRepository implements FileRepository {
  private s3: S3;

  constructor() {
    this.s3 = new S3({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  async uploadFile(file: Express.Multer.File, bucketName: string, key: string): Promise<string> {
    const params: S3.Types.PutObjectRequest = {
      Bucket: bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const result = await this.s3.upload(params).promise();

    return result.Location;
  }
}

export default S3FileRepository;