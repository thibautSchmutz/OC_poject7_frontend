import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() public postInfo;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    console.log(this.postInfo);
  }

  canModify(): boolean {
    if (
      this.postInfo.user_id == this.authService.user_id ||
      this.authService.admin
    ) {
      return true;
    } else {
      return false;
    }
  }
}
