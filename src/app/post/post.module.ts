import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from './post-routing.module';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostComponent } from './components/post/post.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';

@NgModule({
  declarations: [PostListComponent, PostComponent, PostDetailComponent],
  imports: [CommonModule, PostRoutingModule],
  providers: [],
})
export class PostModule {}
