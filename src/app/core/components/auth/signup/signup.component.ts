import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { toFormData } from '../../../utils/formdata-builder';
import { Router } from '@angular/router';
// Modal
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../modal/modal.component';

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
      firstName: [null, [Validators.required, Validators.minLength(2)]],
      lastName: [null, [Validators.required, Validators.minLength(2)]],
      email: [
        null,
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: [null, [Validators.required, Validators.minLength(6)]],
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

  // PATCH IMAGE RETURNED BY IMAGEUPLOADER COMPONENT
  patchImage(e) {
    // via le component "image-upload" on récupère l'image séléctionée
    this.form.patchValue({
      imageUrl: e.files[0],
    });
  }

  // SUBMIT
  signup() {
    if (!this.form.valid) {
      this.matDialog.open(ModalComponent, {
        data: { authFormInvalid: true },
        panelClass: 'custom-dialog-container',
      });
    }
    // ENVOI AU SERVEUR
    if (this.form.valid) {
      // Utilisatation d'un FormData pour assigner chaque type de champs (surtout pour l'image de type "file")
      let formData: FormData = toFormData(this.form.value);

      this.authService.signup(formData).subscribe(
        (res) => {
          this.authService
            .login({ email: res.email, password: this.password.value })
            .subscribe(
              (res) => {
                this.matDialog.open(ModalComponent, {
                  data: { signupConfirm: res },
                  panelClass: 'custom-dialog-container',
                });
                this.router.navigate(['/']);
              },
              (err) => {
                this.matDialog.open(ModalComponent, {
                  data: { loginError: err },
                  panelClass: 'custom-dialog-container',
                });
              }
            );
        },
        (err) => {
          this.matDialog.open(ModalComponent, {
            data: { signupError: err },
            panelClass: 'custom-dialog-container',
          });
        }
      );
    }
  }
}
