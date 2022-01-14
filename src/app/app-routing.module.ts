import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { HomeComponent } from './home/home.component';
import { QuickjobComponent } from './quickjob/quickjob.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: SigninComponent },
  { path: 'quickload', component: QuickjobComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
