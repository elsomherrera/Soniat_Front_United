import { RouterModule, Routes } from '@angular/router';
import {SoniatComponent} from './components/soniat/soniat.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: 'soniat', component: SoniatComponent },
  {path : '', component : SoniatComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: 'soniat', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}