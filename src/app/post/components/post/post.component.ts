import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() public postInfo;

  constructor() {}

  ngOnInit(): void {
    console.log(this.postInfo);
  }
}
