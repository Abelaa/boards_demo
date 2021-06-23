import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './user/auth.guard';
import { AngularFireAuthGuard, redirectUnauthorizedTo, canActivate } from "@angular/fire/auth-guard";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent 
  },
  { 
    path: 'login', 
    loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { 
    path: 'kanban', 
    loadChildren: () => import('./kanban/kanban.module').then(m => m.KanbanModule), 
    ...canActivate(redirectUnauthorizedToLogin)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
