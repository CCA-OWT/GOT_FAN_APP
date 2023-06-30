import { Component } from '@angular/core';
import { ResourceService } from '../resource.service';
import { House } from '../house';
import { Location } from '@angular/common';

@Component({
  selector: 'houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.css']
})
export class HousesComponent {

  constructor(private resourceService: ResourceService, private location: Location) {}

  ngOnInit(): void {
    this.getHouses()
  }

  houses: Set<House> = new Set();

  search: string = ""

  getHouses() {
    for (let i = 1; i < 10; i++) {
      this.resourceService.getHouses(i).subscribe(houses => {
        houses.forEach(house => this.houses.add(house))
      });
    }
  }

  searchTerm(search: string): void {
    this.search = search
  }

  displayHouses(): Set<House> {
    let result = new Set<House>;
    this.houses.forEach(house => {
      if(house.name.toLowerCase().includes(this.search.toLowerCase())) {
        result.add(house);
      }
      else if(house.titles.some(title => title.toLowerCase().includes(this.search.toLowerCase()))) {
        result.add(house);
      }
      else if(house.words.toLowerCase().includes(this.search.toLowerCase())) {
        result.add(house);
      }
      else if(house.coatOfArms.toLowerCase().includes(this.search.toLowerCase())) {
        result.add(house);
      }
      else if(house.region.toLowerCase().includes(this.search.toLowerCase())) {
        result.add(house);
      }
      else if(house.seats.some(seat => seat.toLowerCase().includes(this.search.toLowerCase()))) {
        result.add(house);
      }
      else if(house.founded.toLowerCase().includes(this.search.toLowerCase())) {
        result.add(house);
      }
      else if(house.ancestralWeapons.some(ancestralWeapon => ancestralWeapon.toLowerCase().includes(this.search.toLowerCase()))) {
        result.add(house);
      }
    })
    return result
  }

  getHouseId(house: House): string {
    return house.url.split("/").at(-1) ?? ""
  }

  goBack(): void {
    this.location.back();
  }
}