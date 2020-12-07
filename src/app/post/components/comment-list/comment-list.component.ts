import { Component, Input, OnInit } from '@angular/core';
import { UserState } from 'src/app/user/model/user';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements OnInit {
  public user: UserState;

  @Input() public commentList;
  @Input() public postId;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.userState$.subscribe((res) => (this.user = res));

    // console.log(this.commentList);
  }

  // UI : AFFICHER LE COMMENTAIRE DEPOSE
  addComment($event) {
    this.commentList.push($event);
  }
}
