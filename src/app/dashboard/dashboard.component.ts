import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RESOURCES } from '../resources';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  resources = RESOURCES;

  navigate(resource: string): void {
    this.router.navigateByUrl("/"+resource)
  }
}