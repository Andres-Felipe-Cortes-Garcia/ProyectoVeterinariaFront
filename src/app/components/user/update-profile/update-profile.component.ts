import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/IUser.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  user:User={
    id:"",
    name:"",
    username:"",
    password:"",
    token:""
  };

  canUpdate:boolean = false;
  userChanges: any = {
    name : false,
    password : false
  };

  constructor(private _userService : UserService, private _toastR: ToastrService,
    private route: Router) { }

  ngOnInit(): void {
    const {id,name,username,token} = this._userService.getUserLogged();
    this.user={id,name,username,password:"12345",token};
  }

  fieldChange(field:string){
    this.userChanges[field]=true;
    this.canUpdate = true;
  }

  updateProfile(){
    if(!this.user.id) return
    const data:any = {};
    if(this.userChanges.name) data.name = this.user.name
    if(this.userChanges.password) data.password = this.user.password
    this._userService.update(data,this.user.id)
      .subscribe(res => {
        console.log(res);
        this.canUpdate = false;
        this._userService.setUserLogged(this.user);
        this._toastR.success("El registro se actualizó exitosamente", "EXITO");
        this.route.navigate(["/profile"])
      })
  }

}
