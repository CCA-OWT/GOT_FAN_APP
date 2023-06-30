import { Component } from '@angular/core';
import { ResourceService } from '../resource.service';
import { Character } from '../character';
import { Location } from '@angular/common';

@Component({
  selector: 'characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent {

  constructor(private resourceService: ResourceService, private location: Location) {}

  ngOnInit(): void {
    this.getCharacters()
  }

  characters: Set<Character> = new Set();

  search: string = ""

  getCharacters() {
    for (let i = 1; i < 44; i++) {
      this.resourceService.getCharacters(i).subscribe(characters => {
        characters.forEach(character => this.characters.add(character))
      });
    }
  }

  searchTerm(search: string): void {
    this.search = search
  }

  displayCharacters(): Set<Character> {
    let result = new Set<Character>;
    this.characters.forEach(character => {
      if(character.name.toLowerCase().includes(this.search.toLowerCase())) {
        result.add(character);
      }
      else if(character.aliases.some(alias => alias.toLowerCase().includes(this.search.toLowerCase()))) {
        result.add(character);
      }
      else if(character.titles.some(title => title.toLowerCase().includes(this.search.toLowerCase()))) {
        result.add(character);
      }
      else if(character.gender.toLowerCase().includes(this.search.toLowerCase())) {
        result.add(character);
      }
      else if(character.culture.toLowerCase().includes(this.search.toLowerCase())) {
        result.add(character);
      }
      else if(character.tvSeries.some(tvSeries => tvSeries.toLowerCase().includes(this.search.toLowerCase()))) {
        result.add(character);
      }
      else if(character.playedBy.some(playedBy => playedBy.toLowerCase().includes(this.search.toLowerCase()))) {
        result.add(character);
      }
    })
    return result
  }

  getCharacterId(character: Character): string {
    return character.url.split("/").at(-1) ?? ""
  }

  //TO REMOVE
  getName(id: string): string {
    for (const character of this.characters) {
      if(character.url == id) {
        if(character.name != "") {
          return character.name
        }
        else if(character.aliases.length > 0 && character.aliases[0] != "") {
          return character.aliases[0]
        }
        else if(character.titles.length > 0 && character.titles[0] != "") {
          return character.titles[0]
        }
        return "Unknown (" + (id.split("/").at(-1) ?? -1) + ")"
      }
    }
    return "Unknown (" + (id.split("/").at(-1) ?? -1) + ")"
  }

  goBack(): void {
    this.location.back();
  }
}