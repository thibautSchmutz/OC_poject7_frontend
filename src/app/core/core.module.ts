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

import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [NavbarComponent, FourOhFourComponent, AddPostComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot({
      modules: {
        toolbar: [
          ['bold', 'italic'], // toggled buttons
          [{ list: 'bullet' }],
          [{ color: ['#0d3f74', '#cf4350'] }], // dropdown with defaults from theme
          ['link'], // link and image, video
        ],
      },
      placeholder: 'Ecrivez votre post içi...',
    }),
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
