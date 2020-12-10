// MODULES
import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';
import { CommonModule } from '@angular/common';

//COMPONENTS
import { UserDetailsComponent } from './components/user-details/user-details.component';

@NgModule({
  declarations: [UserDetailsComponent],
  imports: [CommonModule, UserRoutingModule],
})
export class UserModule {}
