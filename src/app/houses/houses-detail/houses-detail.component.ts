import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { House } from 'src/app/house';
import { ActivatedRoute } from '@angular/router';
import { ResourceService } from 'src/app/resource.service';

@Component({
  selector: 'app-houses-detail',
  templateUrl: './houses-detail.component.html',
  styleUrls: ['./houses-detail.component.css']
})
export class HousesDetailComponent {

  constructor(
    private route: ActivatedRoute,
    private resourceService: ResourceService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHouse();
  }

  house: House = {
    url: "",
    name: "",
    region: "",
    coatOfArms: "",
    words: "",
    titles: [],
    seats: [],
    currentLord: "",
    heir: "",
    overlord: "",
    founded: "",
    founder: "",
    diedOut: "",
    ancestralWeapons: [],
    cadetBranches: [],
    swornMembers: []
}
  
  getHouse(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.resourceService.getHouse(id)
      .subscribe(house => this.house = house);
  }

  goBack(): void {
    this.location.back();
  }
}