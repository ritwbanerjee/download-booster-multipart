import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PartDownloadComponent } from './part-download.component';
import { PartDownloadService } from './part-download.service';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule
  ],
  providers: [
    PartDownloadService
  ],
  exports: [
    PartDownloadComponent
  ],
  declarations: [
    PartDownloadComponent
  ]
})


export class PartDownloadModule {}
