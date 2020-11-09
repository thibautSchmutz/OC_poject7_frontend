import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  @ViewChild('passwordToggle') passwordToggle: ElementRef;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, , Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login() {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe(
        (res) => {
          this.router.navigate(['/']);
        },
        (err) => console.log(err)
      );
    } else {
      console.log('formulaire invalid');
    }
  }

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
}
