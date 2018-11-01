import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { config } from '../environments/environment';
import { PartDownloadModel } from '../module/part-download-module/part-download.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'part-download';

  defaultFileUrl: string;
  defaultFileName: string;
  downloadButtonText: string;
  downloadText: string;
  fileUrlInputLabel: string;
  fileNameInputLabel: string;

  downloadInput: PartDownloadModel;

  url = new FormControl('');
  fileName = new FormControl('');
  userInputUrl: string;
  userInputFileName: string;
  enableDownloadButton = false;

  ngOnInit() {
    this.defaultFileUrl = config.fileDownloadUrl;
    this.defaultFileName = config.defaultFilename;
    this.downloadButtonText = config.downloadButtonText;
    this.downloadText = config.downloadText;
    this.fileUrlInputLabel = config.fileUrlInputLabel;
    this.fileNameInputLabel = config.fileNameInputLabel;

    this.url.valueChanges.subscribe(response => {
      this.userInputUrl = response;
      this.checkToEnableButton();
    });

    this.fileName.valueChanges.subscribe(response => {
      this.userInputFileName = response;
      this.checkToEnableButton();
    });
  }

  download(type: string) {

    // type object is passed by the default case download button. For manual entry, type is missing hence the else block will fire
    if (type) {
      this.downloadInput = new PartDownloadModel(
        this.defaultFileUrl,
        config.checkHead,
        this.defaultFileName,
        config.totalChunkSize,
        config.maxDownloadableBytes);
    } else {
      this.downloadInput = new PartDownloadModel(
        this.userInputUrl,
        config.checkHead,
        this.userInputFileName,
        config.totalChunkSize,
        config.maxDownloadableBytes);
    }
  }

  checkToEnableButton() {
    this.enableDownloadButton = (this.userInputFileName && this.userInputUrl) ? true : false;
  }

}
