// MODULES
import { NgModule } from '@angular/core';
import { PostRoutingModule } from './post-routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

//COMPONENTS
import { PostListComponent } from './components/post-list/post-list.component';
import { PostComponent } from './components/post/post.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { CommentComponent } from './components/comment/comment.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';

// DIRECTIVES
import { TextareaAutogrowDirective } from '../core/directives/textarea-autogrow.directive';

@NgModule({
  declarations: [
    PostListComponent,
    PostComponent,
    CommentListComponent,
    CommentComponent,
    AddCommentComponent,
    TextareaAutogrowDirective,
  ],
  imports: [CommonModule, PostRoutingModule, SharedModule],
  providers: [],
})
export class PostModule {}
