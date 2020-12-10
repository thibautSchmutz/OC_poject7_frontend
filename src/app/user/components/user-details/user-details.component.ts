import { Component, OnInit } from '@angular/core';
import { UserState } from '../../model/user';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../../core/components/modal/modal.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  public user: UserState;
  constructor(private userService: UserService, private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.userService.userState$.subscribe((res) => {
      this.user = res;
    });
  }

  editAccount() {
    this.matDialog.open(ModalComponent, {
      data: { editAccount: true },
      panelClass: 'custom-dialog-container',
    });
  }

  editPassword() {
    this.matDialog.open(ModalComponent, {
      data: { editPassword: true },
      panelClass: 'custom-dialog-container',
    });
  }

  deleteAccount() {
    this.matDialog.open(ModalComponent, {
      data: { deleteAccount: true, user_id: this.user.currentUser.id },
      panelClass: 'custom-dialog-container',
    });
  }
}
