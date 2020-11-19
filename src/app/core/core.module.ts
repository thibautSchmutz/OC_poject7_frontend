// MODULES
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { QuillModule } from 'ngx-quill';

// COMPONENTS
import { NavbarComponent } from './components/navbar/navbar.component';
import { FourOhFourComponent } from './components/four-oh-four/four-oh-four.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { PostFormComponent } from './components/add-post/post-form/post-form.component';
import { ModalComponent } from './components/modal/modal.component';

// SERVICES
import { LocalstorageService } from './services/localstorage.service';
import { AuthService } from '../auth/auth.service';
import { PostService } from '../post/post.service';

// AUTRES
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';

@NgModule({
  declarations: [
    NavbarComponent,
    FourOhFourComponent,
    AddPostComponent,
    PostFormComponent,
    ModalComponent,
  ],
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
