import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/user/user.service';
import { PostService } from '../../post.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss'],
})
export class AddCommentComponent implements OnInit {
  @Input() postId;
  @Output()
  public transferComment: EventEmitter<Object> = new EventEmitter<Object>();

  // DECLARATION FORMULAIRE
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // CREATION FORMULAIRE
    this.form = this.fb.group({
      parent_post_id: [null],
      user_id: [null],
      content: [null, [Validators.required]],
    });

    this.form.patchValue({
      parent_post_id: this.postId,
    });

    this.form.patchValue({
      user_id: this.userService.currentUser.id,
    });
  }

  // SUBMIT
  addComment() {
    if (this.form.value.content !== null) {
      this.postService.addNewPost(this.form.value).subscribe(
        (res) => {
          // EMIT TO PARENT SIMULATE UPDATE FROM SERVER
          const transferCommentInfo = {
            content: this.form.value.content,
            createdAt: new Date().toString(),
            creator: {
              firstName: this.userService.currentUser.firstName,
              lastName: this.userService.currentUser.lastName,
              imageUrl: this.userService.currentUser.imageUrl,
            },
          };
          this.transferComment.emit(transferCommentInfo);
        },
        (err) => console.log(err)
      );
    }
  }
}
