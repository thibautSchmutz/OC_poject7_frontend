import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FourOhFourComponent } from './components/four-oh-four/four-oh-four.component';
import { LocalstorageService } from './services/localstorage.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@NgModule({
  declarations: [NavbarComponent, FourOhFourComponent],
  imports: [CommonModule, RouterModule],
  exports: [NavbarComponent, FourOhFourComponent],
  providers: [
    AuthService,
    LocalstorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
