import { Component } from '@angular/core';
import { ResourceService } from '../resource.service';
import { Router } from '@angular/router';
import { Character } from '../character';
import { Location } from '@angular/common';

@Component({
  selector: 'characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent {

  constructor(private resourceService: ResourceService, private router: Router, private location: Location) {}

  ngOnInit(): void {
    this.getCharacters()
  }

  characters: Character[] = [];

  getCharacters() {
    this.resourceService.getCharacters().subscribe(characters => this.characters = characters)
  }

  getCharacterId(character: Character): string {
    return character.url.split("/").at(-1) ?? ""
  }

  goBack(): void {
    this.location.back();
  }
}