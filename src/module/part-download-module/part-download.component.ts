import { Component, Input, OnChanges } from '@angular/core';
import { PartDownloadService } from './part-download.service';
import { PartDownloadModel } from './part-download.model';

@Component({
  selector: 'app-part-download',
  templateUrl: './part-download.component.html',
  styleUrls: ['./part-download.component.scss']
})

export class PartDownloadComponent implements OnChanges {

  @Input() data: PartDownloadModel;

  constructor(
    private partDownload: PartDownloadService
  ) {}

  ngOnChanges() {
    console.log('data: ', this.data);
    if (this.data) {
      this.partDownload.downloadFile(
        this.data.url,
        this.data.filename,
        this.data.chunkSize,
        this.data.maxDownloadableBytes,
        this.data.headUrl);
    }
  }

}
