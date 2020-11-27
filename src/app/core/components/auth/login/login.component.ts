import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
// Modal
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../modal/modal.component';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // RECUPERATION ELEMENTREF
  @ViewChild('passwordToggle') passwordToggle: ElementRef;

  // DECLARATION FORMULAIRE
  public form: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private matDialog: MatDialog,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // CREATION FORMULAIRE
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', [Validators.required]),
    });
  }

  // GETTERS - FORM CONTROLS
  get email() {
    return this.form.get('email');
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

  // SUBMIT
  login() {
    if (!this.form.valid) {
      this.matDialog.open(ModalComponent, {
        data: { authFormInvalid: true },
        panelClass: 'custom-dialog-container',
      });
    }
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe(
        (res) => {
          this.userService.getCurrentUser(res.userId);
          this.router.navigate(['/']);
        },
        (err) => {
          console.log(err);
          this.matDialog.open(ModalComponent, { data: { loginError: err } });
        }
      );
    } else {
      console.log('formulaire invalid');
    }
  }
}
