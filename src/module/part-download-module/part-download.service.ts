import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { forkJoin } from 'rxjs';

@Injectable()


export class PartDownloadService {

  URL: string;
  fileName: string;

  // Configurable
  chunksCount: number;
  maxDownloadableBytes: number;
  checkHead: string;

  fileType: string;
  fileSize: number;
  isMultipartPossible: boolean;

  constructor(
    private http: HttpClient
  ) {}

  // Initiates the file download and also sets the values of the variables if passed
  downloadFile(
    url: string,
    fileName: string,
    chunksCount: number,
    maxDownloadableBytes: number,
    checkHead: string
  ) {
    this.URL = url;
    this.fileName = fileName || 'untitled';
    this.chunksCount = chunksCount || 4;
    this.maxDownloadableBytes = maxDownloadableBytes || 4000000;
    this.checkHead = checkHead;
    this.checkHeaders();
  }

  // Check necessary headers from the requested resource URL
  checkHeaders() {
    this.http.post(this.checkHead, {url: this.URL}).subscribe(res => {
      try {
        this.fileSize = res['content-length'];
        this.fileType = `${res['content-type']};charset=utf-8`;
        this.isMultipartPossible = res['accept-ranges'] === 'bytes';
      } catch (e) {}
      (this.isMultipartPossible) ? this.multipart() : this.monoPart();
    });
  }

  // Logic to set Range and download all chunks in PARALLEL and forkjoin to form 1 response
  multipart() {
    const fileSize = (this.fileSize > this.maxDownloadableBytes) ? this.maxDownloadableBytes : this.fileSize;
    const chunks = [{}];
    const chunkSize = fileSize / this.chunksCount;

    // Create chunks with start and end bytes
    let j = 0;
    for (let index = 0; index < fileSize; index += chunkSize + 1) {
      chunks[j++] = {
        start: index,
        end: index + chunkSize > fileSize ? fileSize : index + chunkSize
      };
    }

    const headers = [];
    for (let chunkIndex = 0; chunkIndex < chunks.length; chunkIndex++) {
      const chunk = chunks[chunkIndex];
      const rangeVal = 'bytes=' + chunk['start'] + '-' + chunk['end'];
      const httpHeaders = new HttpHeaders().append('Range', rangeVal);

      headers.push(this.http.get(this.URL, {
        headers: httpHeaders,
        responseType: 'blob'
      }));
    }

    const daemon = forkJoin(headers).subscribe(response => {
      this.saveFile(daemon);
    });
  }

  // If Range is not supported, download the whole file at once
  monoPart() {
    const headers = [];
    headers.push(this.http.get(this.URL, {
      responseType: 'blob'
    }));

    const daemon = forkJoin(headers).subscribe(response => {
      this.saveFile(daemon);
    });
  }

  // Writes the daemon to disk
  saveFile(response) {
    const blob  = new Blob([response], { type: this.fileType });
    saveAs(blob, this.fileName);
  }
}
