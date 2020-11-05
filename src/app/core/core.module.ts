import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FourOhFourComponent } from './components/four-oh-four/four-oh-four.component';

@NgModule({
  declarations: [NavbarComponent, FourOhFourComponent],
  imports: [CommonModule],
  exports: [NavbarComponent, FourOhFourComponent],
})
export class CoreModule {}
