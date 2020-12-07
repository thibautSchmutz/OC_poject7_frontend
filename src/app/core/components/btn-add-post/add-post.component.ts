import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../services/auth.service';
// Modal
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit {
  public isAuth: boolean;

  constructor(private authService: AuthService, private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.authService.isAuth$.subscribe((res) => (this.isAuth = res));
  }

  openModal() {
    this.matDialog.open(ModalComponent, {
      data: { addPost: true },
      panelClass: 'custom-dialog-container',
    });
  }
}
