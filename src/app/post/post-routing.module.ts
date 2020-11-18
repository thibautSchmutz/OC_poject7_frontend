import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './components/post-list/post-list.component';
import { IsAuthGuard } from '../core/guards/is-auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PostListComponent,
    canActivate: [IsAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
