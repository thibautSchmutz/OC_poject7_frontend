import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../auth.service';
import { toFormData } from '../../../core/utils/formdata-builder';
// Modal
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  // RECUPERATION ELEMENTREF
  @ViewChild('passwordToggle') passwordToggle: ElementRef;

  // DECLARATION FORMULAIRE
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private matDialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    // CREATION FORMULAIRE
    this.form = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      imageUrl: [null],
    });
  }

  // GETTERS - FORM CONTROLS
  get firstName() {
    return this.form.get('firstName');
  }
  get lastName() {
    return this.form.get('lastName');
  }
  get email() {
    return this.form.get('email');
  }
  get imageUrl() {
    return this.form.get('imageUrl');
  }
  get password() {
    return this.form.get('password');
  }

  // AFFICHER MOT DE PASSE
  showPassword(password) {
    if (password.type === 'password') {
      password.type = 'text';
      this.passwordToggle.nativeElement.classList.replace(
        'hide-password',
        'show-password'
      );
    } else {
      password.type = 'password';
      this.passwordToggle.nativeElement.classList.replace(
        'show-password',
        'hide-password'
      );
    }
  }

  // IMAGE UPLOAD & READER
  // imageUrlReader est bindé à l'attribut 'src' de l'img de preview
  imageUrlReader: string;
  onFileChange(event) {
    // permet d'accéder à l'objet (files) du l'input de type file et de l'assigner au formControl
    this.form.patchValue({
      imageUrl: event.target.files[0],
    });

    //permet la lecture dans le DOM du fichier grâce à FileReader
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event: any) => {
      this.imageUrlReader = event.target.result;
    };
  }

  // SUBMIT
  signup() {
    if (!this.form.valid) {
      console.log(this.form);
    }
    // ENVOI AU SERVEUR
    if (this.form.valid) {
      // Utilisatation d'un FormData pour assigner chaque type de champs (surtout pour l'image de type "file")
      let formData: FormData = toFormData(this.form.value);
      console.log(formData);

      this.authService.signup(formData).subscribe(
        (res) => {
          this.authService
            .login({ email: res.email, password: this.password.value })
            .subscribe(
              (res) => {
                this.matDialog.open(ModalComponent, {
                  data: { signupConfirm: res },
                });
                this.router.navigate(['/']);
              },
              (err) => {
                console.log(err);
                this.matDialog.open(ModalComponent, {
                  data: { loginError: err },
                });
              }
            );
        },
        (err) => {
          console.log(err);
          this.matDialog.open(ModalComponent, { data: { signupError: err } });
        }
      );
    }
  }
}
