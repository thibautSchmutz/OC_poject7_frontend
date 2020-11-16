import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [ModalComponent],
  imports: [CommonModule, MatDialogModule],
  exports: [MatDialogModule, ModalComponent],
})
export class SharedModule {}
