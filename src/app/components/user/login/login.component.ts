
import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/IUser.interface';
import { UserService } from 'src/app/services/user.service';

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
          this.route.navigate(['/home'])
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
}
