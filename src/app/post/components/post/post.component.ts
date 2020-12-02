import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../../core/components/modal/modal.component';
import { PostService } from '../../post.service';
import { Post } from '../../post';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() public postInfo;
  public commentSectionOpened: boolean = false;

  constructor(
    private authService: AuthService,
    private matDialog: MatDialog,
    private postService: PostService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // console.log(this.postInfo);
  }

  canModify(): boolean {
    if (
      this.postInfo.user_id == this.userService.currentUser.id.toString() ||
      this.userService.currentUser.id.toString() === '1'
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

  toggleLike(el: HTMLInputElement) {
    // DISLIKE
    if (el.classList.contains('card-footer-cta_clicked')) {
      el.classList.remove('card-footer-cta_clicked');
      // SEND REMOVE LIKE TO SERVER
      this.postService
        .removeLike(
          this.postInfo.id,
          this.userService.currentUser.id.toString()
        )
        .subscribe((res) => {
          console.log(res);
          // UPDATE POSTS STATE
          this.postService.updateAllPostsState();
        });
      // LIKE
    } else {
      el.classList.add('card-footer-cta_clicked');
      // SEND ADD LIKE TO SERVER
      this.postService
        .addLike(this.postInfo.id, this.userService.currentUser.id.toString())
        .subscribe((res) => {
          console.log(res);
          // UPDATE POSTS STATE
          this.postService.updateAllPostsState();
        });
    }
  }

  // CONDITONALY SHOW LIKES
  addLikeUI() {
    return this.postInfo.likes.some(
      (el) =>
        el.like.like_user_id.toString() ===
        this.userService.currentUser.id.toString()
    );
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
