import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from './components/modal/modal.component';
import { MatButtonModule } from '@angular/material/button';
import { PostFormComponent } from './components/post-form/post-form.component';
// import { ImageUploadComponent } from './components/image-upload/image-upload.component';

@NgModule({
  declarations: [ModalComponent, PostFormComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [ModalComponent, MatButtonModule, FormsModule, ReactiveFormsModule],
})
export class SharedModule {}
