import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserState } from '../../model/user';
import { UserService } from '../../services/user.service';
import { ModalComponent } from '../../../core/components/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';

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

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private matDialog: MatDialog
  ) {}

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
            // FERMETURE DE LA MODAL
            this.closeModal.emit(true);
          },
          (err) => {
            // OUVERTURE NEW MODAL
            this.matDialog.open(ModalComponent, {
              data: { editPasswordError: err },
              panelClass: 'custom-dialog-container',
            });
          }
        );
    }
  }
}
