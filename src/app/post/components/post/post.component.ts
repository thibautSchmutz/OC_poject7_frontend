import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../../core/components/modal/modal.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() public postInfo;

  public commentSectionOpened: boolean = false;

  constructor(private authService: AuthService, private matDialog: MatDialog) {}

  ngOnInit(): void {}

  canModify(): boolean {
    if (
      this.postInfo.user_id == this.authService.user_id ||
      this.authService.admin
    ) {
      return true;
    } else {
      return false;
    }
  }

  ModalDeletePost() {
    this.matDialog.open(ModalComponent, {
      data: { deletePost: true, postId: this.postInfo.id },
      panelClass: 'custom-dialog-container',
    });
  }

  addLike(el: HTMLInputElement) {
    // TOGGLE CLICKED CSS CLASS
    if (el.classList.contains('card-footer-cta_clicked')) {
      el.classList.remove('card-footer-cta_clicked');
      el.textContent = 'Aimer';
    } else {
      el.classList.add('card-footer-cta_clicked');
      el.textContent = "J'aime";
    }
  }

  openComments(el: HTMLInputElement) {
    // TOGGLE CLICKED CSS CLASS
    if (el.classList.contains('card-footer-cta_clicked')) {
      el.classList.remove('card-footer-cta_clicked');
    } else {
      el.classList.add('card-footer-cta_clicked');
    }

    // DISPLAY COMMENT SECTION VIA NGIF DIRECTIVE
    if (this.commentSectionOpened) {
      this.commentSectionOpened = false;
    } else {
      this.commentSectionOpened = true;
    }
  }
}
