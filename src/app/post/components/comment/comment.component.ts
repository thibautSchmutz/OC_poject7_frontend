import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../../core/components/modal/modal.component';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() public user;
  @Input() public commentInfo;

  // CONDITIONNALY DISPLAY ON RIGHT OR LEFT
  @HostBinding('style.alignSelf')
  get alignSelf(): string {
    if (this.commentInfo.user_id == this.user.currentUser.id.toString()) {
      return 'flex-end';
    } else {
      return 'flex-start';
    }
  }

  constructor(private matDialog: MatDialog) {}

  ngOnInit(): void {
    // console.log(this.commentInfo);
  }

  canModify(): boolean {
    if (
      this.commentInfo.user_id == this.user.currentUser.id.toString() ||
      this.user.admin === true
    ) {
      return true;
    } else {
      return false;
    }
  }

  ModalDeletePost() {
    this.matDialog.open(ModalComponent, {
      data: {
        deletePost: true,
        postId: this.commentInfo.id,
        parentPostId: this.commentInfo.parent_post_id,
      },
      panelClass: 'custom-dialog-container',
    });
  }
}
