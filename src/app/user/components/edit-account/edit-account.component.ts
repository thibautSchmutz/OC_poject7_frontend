import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { toFormData } from 'src/app/core/utils/formdata-builder';
import { UserState } from '../../model/user';
import { UserService } from '../../services/user.service';
import { ModalComponent } from '../../../core/components/modal/modal.component';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss'],
})
export class EditAccountComponent implements OnInit {
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
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      imageUrl: [null],
    });

    this.form.patchValue({
      firstName: this.user.currentUser.firstName,
    });
    this.form.patchValue({
      lastName: this.user.currentUser.lastName,
    });
  }

  // IMAGE UPLOAD
  patchImage(e) {
    // via le component "image-upload" on récupère l'image séléctionée
    this.form.patchValue({
      imageUrl: e.files[0],
    });
  }

  editAccount() {
    if (this.form.value.firstName && this.form.value.lastName) {
      // CREATION DU FORM DATA
      let formData: FormData = toFormData(this.form.value);
      // ENVOYER LE FORMULAIRE AU SERVEUR VIA USER SERVICE
      this.userService
        .editAccount(formData, this.user.currentUser.id)
        .subscribe(
          (res) => {
            this.userService.updateUserState({
              ...this.user,
              currentUser: res,
            });
            // FERMETURE DE LA MODAL
            this.closeModal.emit(true);
          },
          (err) => {
            // OUVERTURE NEW MODAL
            this.matDialog.open(ModalComponent, {
              data: { editAccountError: err },
              panelClass: 'custom-dialog-container',
            });
          }
        );
    }
  }
}
