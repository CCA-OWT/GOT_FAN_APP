import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Character } from 'src/app/character';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceService } from 'src/app/resource.service';

@Component({
  selector: 'characters-detail',
  templateUrl: './characters-detail.component.html',
  styleUrls: ['./characters-detail.component.css']
})
export class CharactersDetailComponent {

  constructor(
    private route: ActivatedRoute,
    private resourceService: ResourceService,
    private location: Location,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.getCharacter();
    this.getCharacters();
    this.getHouses();
    this.getBooks();
  }

  character: Character = {
    url: "",
    name: "",
    gender: "",
    culture: "",
    born: "",
    died: "",
    titles: [],
    aliases: [],
    father: "",
    mother: "",
    spouse: "",
    allegiances: [],
    books: [],
    povBooks: [],
    tvSeries: [],
    playedBy: []
  }

  characters: Map<number, string> = new Map()

  books: Map<number, string> = new Map()

  houses: Map<number, string> = new Map()
  
  getCharacter(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.resourceService.getCharacter(id)
      .subscribe(character => this.character = character);
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

  getBooks(): void {
    this.resourceService.getBooks().subscribe(books => {
      books.forEach(book => {
        const id = Number(book.url.split("/").at(-1) ?? -1)
        if(book.name != "") {
          this.books.set(id, book.name)
        }
        else {
          this.books.set(id, "Unknown book (" + id + ")")
        }
      })
    });
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

  getHouseName(house: string): string {
    const id = Number(house.split("/").at(-1) ?? -1)
    if(id >= 0) {
      return this.houses.get(id) ?? ("Unknown house (" + id + ")")
    }
    else {
      return "House not found"
    }
  }

  getBookName(book: string): string {
    const id = Number(book.split("/").at(-1) ?? -1)
    if(id >= 0) {
      return this.books.get(id) ?? ("Unknown book (" + id + ")")
    }
    else {
      return "Book not found"
    }
  }

  getCharacterLink(url: string): string {
    return "/characters/" + url.split("/").at(-1)
  }

  getHouseLink(url: string): string {
    return "/houses/" + url.split("/").at(-1)
  }

  getBookLink(url: string): string {
    return "/books/" + url.split("/").at(-1)
  }

  goBack(): void {
    this.location.back();
  }
}