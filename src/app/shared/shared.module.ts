// MODULES
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

// COMPONENTS
import { ImageUploadComponent } from './components/image-upload/image-upload.component';

@NgModule({
  declarations: [ImageUploadComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    ImageUploadComponent,
  ],
})
export class SharedModule {}
