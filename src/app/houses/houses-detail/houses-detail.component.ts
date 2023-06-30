import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { House } from 'src/app/house';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceService } from 'src/app/resource.service';

@Component({
  selector: 'houses-detail',
  templateUrl: './houses-detail.component.html',
  styleUrls: ['./houses-detail.component.css']
})
export class HousesDetailComponent {

  constructor(
    private route: ActivatedRoute,
    private resourceService: ResourceService,
    private location: Location,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.getHouse();
    this.getHouses();
    this.getCharacters();
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

  houses: Map<number, string> = new Map()

  characters: Map<number, string> = new Map()
  
  getHouse(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.resourceService.getHouse(id)
      .subscribe(house => this.house = house);
  }

  getHouses(): void {
    for (let i = 1; i < 10; i++) {
      this.resourceService.getHouses(i).subscribe(houses => {
        houses.forEach(house => {
          const id = Number(house.url.split("/").at(-1) ?? -1)
          if(house.name != "") {
            this.houses.set(id, house.name)
          }
          else {
            this.houses.set(id, "Unknown house (" + id + ")")
          }
        })
      });
    }
  }

  getCharacters(): void {
    for (let i = 1; i < 44; i++) {
      this.resourceService.getCharacters(i).subscribe(characters => {
        characters.forEach(character => {
          const id = Number(character.url.split("/").at(-1) ?? -1)
          if(character.name != "") {
            this.characters.set(id, character.name)
          }
          else if(character.aliases.length > 0 && character.aliases[0] != "") {
            this.characters.set(id, character.aliases[0])
          }
          else {
            this.characters.set(id, "Unknown character (" + id + ")")
          }
        })
      });
    }
  }

  getHouseName(house: string): string {
    const id = Number(house.split("/").at(-1) ?? -1)
    if(id >= 0) {
      return this.houses.get(id) ?? ("Unknown house (" + id + ")")
    }
    else {
      return "House not found"
    }
  }

  getCharacterName(character: string): string {
    const id = Number(character.split("/").at(-1) ?? -1)
    if(id >= 0) {
      return this.characters.get(id) ?? ("Unknown character (" + id + ")")
    }
    else {
      return "Character not found"
    }
  }

  getHouseLink(url: string): string {
    return "/houses/" + url.split("/").at(-1)
  }

  getCharacterLink(url: string): string {
    return "/characters/" + url.split("/").at(-1)
  }

  goBack(): void {
    this.location.back();
  }
}