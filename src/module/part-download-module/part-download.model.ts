export class PartDownloadModel {

  constructor(
    url: string,
    headUrl: string,
    filename?: string,
    chunkSize?: number,
    maxDownloadableBytes?: number
  ) {
    return {
      url: url,
      headUrl: headUrl,
      filename: filename,
      chunkSize: chunkSize,
      maxDownloadableBytes: maxDownloadableBytes
    };
  }
}

export interface PartDownloadModel {
  url: string;
  headUrl: string;
  filename?: string;
  chunkSize?: number;
  maxDownloadableBytes?: number;
}
