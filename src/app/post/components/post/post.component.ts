import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../../core/components/modal/modal.component';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  @Input() public user;
  @Input() public postInfo: Post;
  public commentSectionOpened: boolean = false;

  constructor(private matDialog: MatDialog, private postService: PostService) {}

  canModify(): boolean {
    return this.postInfo.user_id === this.user?.currentUser?.id ||
      this.user?.admin === true
      ? true
      : false;
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
        .removeLike(this.postInfo.id, this.user.currentUser.id.toString())
        .subscribe((res) => {
          console.log(res);
        });
      // LIKE
    } else {
      el.classList.add('card-footer-cta_clicked');
      // SEND ADD LIKE TO SERVER
      this.postService
        .addLike(this.postInfo.id, this.user.currentUser.id.toString())
        .subscribe((res) => {
          console.log(res);
        });
    }
  }

  // CONDITONALY SHOW LIKES
  addLikeUI() {
    return this.postInfo?.likes?.some(
      (el) =>
        el.like.like_user_id.toString() ===
        this.user?.currentUser?.id?.toString()
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
    this.commentSectionOpened = !this.commentSectionOpened;
  }
}
