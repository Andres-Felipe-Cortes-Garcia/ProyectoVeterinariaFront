import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  navigate(route: string) {
    switch(route) {
      case 'login':
        this.router.navigate(['/user/login'])
        break;
      case 'signup':
        this.router.navigate(['/user/signup'])
        break;
    }
  }

}
