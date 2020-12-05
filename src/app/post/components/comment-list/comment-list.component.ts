import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements OnInit {
  @Input() public commentList;
  @Input() public postId;

  constructor() {}

  ngOnInit(): void {
    console.log(this.commentList);
  }

  // UI : AFFICHER LE COMMENTAIRE DEPOSE
  addComment($event) {
    this.commentList.push($event);
  }
}
