import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from './post-routing.module';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostComponent } from './components/post/post.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { CommentComponent } from './components/comment/comment.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PostListComponent,
    PostComponent,
    CommentListComponent,
    CommentComponent,
    AddCommentComponent,
  ],
  imports: [CommonModule, PostRoutingModule, SharedModule],
  providers: [],
})
export class PostModule {}
