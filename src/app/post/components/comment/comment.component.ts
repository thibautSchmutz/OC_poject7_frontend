import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../../core/components/modal/modal.component';
import { PostService } from '../../post.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() public commentInfo;

  // CONDITIONNALY DISPLAY ON RIGHT OR LEFT
  @HostBinding('style.alignSelf')
  get alignSelf(): string {
    if (
      this.commentInfo.user_id == this.userService.currentUser.id.toString()
    ) {
      return 'flex-end';
    } else {
      return 'flex-start';
    }
  }

  constructor(
    private userService: UserService,
    private matDialog: MatDialog,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    console.log(this.commentInfo);
  }

  canModify(): boolean {
    if (
      this.commentInfo.user_id == this.userService.currentUser.id.toString() ||
      this.userService.currentUser.id.toString() === '1'
    ) {
      return true;
    } else {
      return false;
    }
  }

  ModalDeletePost() {
    this.matDialog.open(ModalComponent, {
      data: { deletePost: true, postId: this.commentInfo.id },
      panelClass: 'custom-dialog-container',
    });
  }
}
