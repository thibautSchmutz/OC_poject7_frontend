import { ThrowStmt } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Post } from 'src/app/post/post';
import { PostService } from 'src/app/post/post.service';

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
    this.router.navigate(['/connect/login']);
    this.dialogRef.close();
  }

  signup() {
    this.router.navigate(['/connect/signup']);
    this.dialogRef.close();
  }

  closeModal() {
    this.dialogRef.close();
  }

  deletePost() {
    this.postService.deletePost(this.data.postId).subscribe(
      (res) => {
        let newPostState = this.posts;
        newPostState.forEach((post) => {
          if (post.id == this.data.parentPostId) {
            post.comments = post.comments.filter(
              (comment) => comment.id != this.data.postId
            );
          }
        });
        this.postService.updatePostState(newPostState);
      },
      (err) => {
        // erreur possible de parsing, qui n'empèche pas la requête de s'exécuter
        if (err.status === 200) {
          let newPostState = this.posts;
          newPostState.forEach((post) => {
            if (post.id == this.data.parentPostId) {
              post.comments = post.comments.filter(
                (comment) => comment.id != this.data.postId
              );
            }
          });
          this.postService.updatePostState(newPostState);
        }
        console.log(err);
      }
    );
    this.dialogRef.close();
  }
}
