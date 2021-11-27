import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { loginAnswer, User } from '../interfaces/IUser.interface';
 


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = environment.baseUrl;
  private user: User = {
    id:"",
    name:"",
    username:"",
    password:"",
    token:""
  };
  
  constructor(private http:HttpClient) { }
  
  setUserLogged(user : User)
  {
    this.user = user;
    localStorage.setItem("userLogged",JSON.stringify(user));
  }

  getUserLogged()
  {
    return JSON.parse(localStorage.getItem("userLogged")||"{}");
  }

  deleteLogged()
  {
    localStorage.removeItem("userLogged");
  }

  register(user:User):Observable<User>{

    return this.http.post<User>(`${this.url}/auth/signup`,user);
  }

  login(user:User):Observable<loginAnswer>{

    return this.http.post<loginAnswer>(`${this.url}/auth/login`,user);
    
  }

  update(user:any,id:string):Observable<String>{

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${this.user.token}`
      })
    };

    return this.http.patch<String>(`${this.url}/api/users/${id}`,user,httpOptions);
    
  }

  delete(id:string):Observable<String>{

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${this.user.token}`
      })
    };

    return this.http.delete<String>(`${this.url}/api/users/${id}`,httpOptions);
    
  }

}
