import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  logout(): void {
    console.log("logout");
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }

  isUserLoggedIn(): boolean {
    return this.authService.isUserLoggedIn()
  }
  
}
