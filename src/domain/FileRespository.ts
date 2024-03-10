export interface FileRepository {
  uploadFile(file: Express.Multer.File, bucketName: string, key: string): Promise<string>;
}
