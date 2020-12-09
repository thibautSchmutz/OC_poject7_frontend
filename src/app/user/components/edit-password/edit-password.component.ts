import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserState } from '../../model/user';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.scss'],
})
export class EditPasswordComponent implements OnInit {
  private user: UserState;
  @Output()
  public closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  // DECLARATION FORMULAIRE
  form: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userService.userState$.subscribe((res) => (this.user = res));
    // CREATION FORMULAIRE
    this.form = this.fb.group({
      password: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
    });
  }

  editPassword() {
    if (this.form.value.password && this.form.value.newPassword) {
      console.log(this.form.value);
      // CREATION DU FORM DATA
      // let formData: FormData = toFormData(this.form.value);

      this.userService
        .editPassword(this.form.value, this.user.currentUser.id)
        .subscribe(
          (res) => {
            console.log(res);
            // FERMETURE DE LA MODAL
            this.closeModal.emit(true);
          },
          (err) => console.log(err)
        );
    }
  }
}
