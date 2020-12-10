import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Post } from 'src/app/post/models/post';
import { PostService } from 'src/app/post/services/post.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  private posts: Post[];

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.postService.allPosts$.subscribe((res) => (this.posts = res));
  }

  login() {
    this.router.navigate(['/login']);
    this.dialogRef.close();
  }

  signup() {
    this.router.navigate(['/signup']);
    this.dialogRef.close();
  }

  closeModal() {
    this.dialogRef.close();
  }

  deletePost() {
    this.postService.deletePost(this.data.postId).subscribe(
      (res) => {
        console.log(res);
        // UPDATE POST STATE
        let newPostState = this.posts;
        if (this.data.parentPostId) {
          // si c'est un commentaire
          newPostState.forEach((post) => {
            if (post.id == this.data.parentPostId) {
              post.comments = post.comments.filter(
                (comment) => comment.id != this.data.postId
              );
            }
          });
        } else {
          // si c'est un post
          newPostState = newPostState.filter(
            (post) => post.id != this.data.postId
          );
        }
        this.postService.updatePostState(newPostState);
      },
      (err) => {
        console.log(err);
      }
    );
    this.dialogRef.close();
  }
}
