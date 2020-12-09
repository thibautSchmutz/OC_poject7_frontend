// MODULES
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { QuillModule } from 'ngx-quill';

// COMPONENTS
import { NavbarComponent } from './components/navbar/navbar.component';
import { FourOhFourComponent } from './components/four-oh-four/four-oh-four.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AddPostComponent } from './components/btn-add-post/add-post.component';
import { PostFormComponent } from './components/btn-add-post/post-form/post-form.component';
import { ModalComponent } from './components/modal/modal.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { EditAccountComponent } from '../user/components/edit-account/edit-account.component';
import { EditPasswordComponent } from '../user/components/edit-password/edit-password.component';

// SERVICES
import { AuthService } from './services/auth.service';
import { PostService } from '../post/post.service';
import { UserService } from '../user/user.service';

// INTERCEPTORS
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';

@NgModule({
  declarations: [
    NavbarComponent,
    FourOhFourComponent,
    SignupComponent,
    LoginComponent,
    AddPostComponent,
    PostFormComponent,
    ModalComponent,
    ImageUploadComponent,
    EditAccountComponent,
    EditPasswordComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot({
      modules: {
        toolbar: [
          ['bold', 'italic'], // toggled buttons
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
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
