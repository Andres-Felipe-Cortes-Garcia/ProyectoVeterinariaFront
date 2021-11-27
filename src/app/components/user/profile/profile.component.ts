import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/IUser.interface';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  user:User={
    id:"",
    name:"",
    username:"",
    password:"",
    token:""
  };


  
  constructor( private _toastR: ToastrService,private route: Router,private _userService : UserService) { }

  ngOnInit(): void {
    const {id,name,username,password,token} = this._userService.getUserLogged();
    this.user={id,name,username,password:"*********",token};
  }

  goToUpdate(){
    this.route.navigate(['/update-profile'])
  }

  deleteProfile(){
    if(!this.user.id) return
   
    this._userService.delete(this.user.id)
      .subscribe(res => {
        console.log(res);
        this._userService.deleteLogged();
        this.route.navigate(["/home"])
        this._toastR.success("El registro eliminó exitosamente", "EXITO");
      })
  }

  openModal(){
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Esta accion es irreversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Borrado!',
          'Cuenta eliminada con exito.',
          'success'
        )
        this.deleteProfile();
      }
    })
  }

  
  

  
}
