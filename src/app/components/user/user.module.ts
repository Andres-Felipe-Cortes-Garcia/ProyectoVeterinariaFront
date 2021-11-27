import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule } from '@angular/forms';
import { UpdateProfileComponent } from './update-profile/update-profile.component';




@NgModule({
  declarations: [
    LoginComponent,
    ProfileComponent,
    UpdateProfileComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule 
  ]
})
export class UserModule { }
