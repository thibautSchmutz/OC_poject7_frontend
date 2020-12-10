import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserState } from 'src/app/user/model/user';
import { UserService } from 'src/app/user/services/user.service';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss'],
})
export class AddCommentComponent implements OnInit {
  @Input() user: UserState;
  @Input() postId;
  @Output()
  public transferComment: EventEmitter<Object> = new EventEmitter<Object>();

  public posts: Post[];

  // DECLARATION FORMULAIRE
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.postService.allPosts$.subscribe((res) => (this.posts = res));

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
      user_id: this.user.currentUser.id,
    });
  }

  // SUBMIT
  addComment() {
    if (this.form.value.content) {
      this.postService.addNewPost(this.form.value).subscribe(
        (res) => {
          // RESET LE FORM
          this.form.reset();
          this.form.patchValue({
            parent_post_id: this.postId,
          });
          this.form.patchValue({
            user_id: this.user.currentUser.id,
          });

          // UPDATE POST STATE
          let newPostState = this.posts;
          newPostState.forEach((post) => {
            if (post.id == this.postId) {
              post.comments.push({ ...res, creator: this.user.currentUser });
            }
          });
          this.postService.updatePostState(newPostState);
        },
        (err) => console.log(err)
      );
    }
  }
}
