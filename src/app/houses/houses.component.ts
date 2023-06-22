import { Component } from '@angular/core';
import { ResourceService } from '../resource.service';
import { Router } from '@angular/router';
import { House } from '../house';
import { Location } from '@angular/common';

@Component({
  selector: 'houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.css']
})
export class HousesComponent {

  constructor(private resourceService: ResourceService, private router: Router, private location: Location) {}

  ngOnInit(): void {
    this.getHouses()
  }

  houses: House[] = [];

  getHouses() {
    this.resourceService.getHouses().subscribe(houses => this.houses = houses)
  }

  getHouseId(house: House): string {
    return house.url.split("/").at(-1) ?? ""
  }

  goBack(): void {
    this.location.back();
  }
}