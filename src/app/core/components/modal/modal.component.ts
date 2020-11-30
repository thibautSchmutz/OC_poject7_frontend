import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PostService } from 'src/app/post/post.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private postService: PostService
  ) {}

  ngOnInit() {}

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
        console.log(res);
        this.postService.updatePostState();
      },
      (err) => {
        // erreur possible de parsing, qui n'empèche pas la requête de s'exécuter
        if (err.status === 200) {
          this.postService.updatePostState();
        }
        console.log(err);
      }
    );
    this.dialogRef.close();
  }
}
