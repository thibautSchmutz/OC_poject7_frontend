import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { FourOhFourComponent } from './core/components/four-oh-four/four-oh-four.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: AppComponent },
  {
    path: 'connect',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  { path: '**', component: FourOhFourComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
