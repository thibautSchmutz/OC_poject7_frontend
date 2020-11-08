import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public form: FormGroup;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, , Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login() {
    if (this.form.status === 'VALID') {
      console.log('formulaire valid');
      console.log(this.form.value);
    } else if (this.form.status === 'INVALID') {
      console.log('formulaire invalid');
    }

    // this.authService.login().subscribe(
    //   (res) => {
    //     console.log(res);
    //     console.log(this.form);
    //     this.form.reset();
    //   },
    //   (err) => console.log(err)
    // );
  }
}
