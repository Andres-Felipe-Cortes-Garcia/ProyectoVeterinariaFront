
import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/IUser.interface';
import { UserService } from 'src/app/services/user.service';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  buttonText: string = '';
  headerText: string = '';
  currentRoute: string = '';
  user: User = {
    username : '',
    password : '',
    name : ''
  }

  constructor(
    private route: Router,
    private _userService:UserService,
    private _toastR: ToastrService

    ) {}

  ngOnInit(): void {
    console.log(this.route);
    this.currentRoute = this.route.url.split('/')[2]
    if (this.currentRoute === 'login')
    {
      this.buttonText = 'Ingresar';
      this.headerText = 'Ingresa';

    }else if (this.currentRoute === 'signup')
    {
      this.buttonText = 'Registrarse';
      this.headerText = 'Registrate';
    }


    
  }

  action()
  {
    console.log(this.user);

    if (this.currentRoute === 'login')
    {
      this._userService.login(this.user)
        .subscribe(res => {

          if(res.response.slice(0,6)==="ERROR.")
            return this._toastR.warning( res.response.slice(7),"ERROR");
          
          const dataToken =this.decodedToken(res.accessToken);
          if(!dataToken)return
          this._userService.setUserLogged({
            username:dataToken.username,
            password:"",
            name:dataToken.name,
            token:res.accessToken,
            id:dataToken._id
          });
          
          this.route.navigate(['/profile'])
          this._toastR.success('Se ingresó al sistema correctamente correctamente');

          
        })

    }else if (this.currentRoute === 'signup')
    {
      this._userService.register(this.user)
        .subscribe(res => {
          this.route.navigate(['/home'])
          this._toastR.success('Se registró correctamente');
        })
    }
    
  }

  decodedToken(accessToken:string)
  {
    const helper = new JwtHelperService();
 
    const decodedToken = helper.decodeToken(accessToken);
    return decodedToken.user;

    
  }
}
