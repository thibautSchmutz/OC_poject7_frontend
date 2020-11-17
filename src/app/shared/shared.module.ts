import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from './components/modal/modal.component';
import { MatButtonModule } from '@angular/material/button';
// import { ImageUploadComponent } from './components/image-upload/image-upload.component';

@NgModule({
  declarations: [ModalComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule, RouterModule],
  exports: [MatDialogModule, ModalComponent, MatButtonModule],
})
export class SharedModule {}
