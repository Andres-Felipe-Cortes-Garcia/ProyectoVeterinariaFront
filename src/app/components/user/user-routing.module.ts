import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';

const routes: Routes = [
    {
      path:"login",
      component: LoginComponent
    },
    {
      path:"signup",
      component: LoginComponent
    },
    {
      path:"profile",
      component: ProfileComponent
    },
    {
      path:"update-profile",
      component: UpdateProfileComponent
    }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
