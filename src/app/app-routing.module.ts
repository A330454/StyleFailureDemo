import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/generics/login/login.component';

const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path: "", redirectTo: "login", pathMatch: "full" }, // if nothing redirect to login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
