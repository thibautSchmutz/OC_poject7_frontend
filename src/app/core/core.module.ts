import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FourOhFourComponent } from './components/four-oh-four/four-oh-four.component';
import { LocalstorageService } from './services/localstorage.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TokenInterceptor } from './interceptors/token.interceptor';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { AddPostComponent } from './components/add-post/add-post.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PostService } from '../post/post.service';

@NgModule({
  declarations: [NavbarComponent, FourOhFourComponent, AddPostComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [NavbarComponent, FourOhFourComponent, AddPostComponent],
  providers: [
    AuthService,
    PostService,
    LocalstorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
