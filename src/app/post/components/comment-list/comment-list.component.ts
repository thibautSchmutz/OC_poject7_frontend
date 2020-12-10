import { Component, Input, OnInit } from '@angular/core';
import { UserState } from 'src/app/user/model/user';
import { Post } from '../../models/post';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements OnInit {
  @Input() public commentList: Post[];
  @Input() public user: UserState;
  @Input() public postId;

  constructor() {}

  ngOnInit(): void {}
}
