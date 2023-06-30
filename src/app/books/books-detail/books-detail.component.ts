import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Book } from 'src/app/book';
import { ActivatedRoute } from '@angular/router';
import { ResourceService } from 'src/app/resource.service';

@Component({
  selector: 'books-detail',
  templateUrl: './books-detail.component.html',
  styleUrls: ['./books-detail.component.css']
})
export class BooksDetailComponent {

  constructor(
    private route: ActivatedRoute,
    private resourceService: ResourceService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getBook();
    this.getCharacters();
  }

  book: Book = {
    url: "",
    name: "",
    isbn: "",
    authors: [],
    numberOfPages: 0,
    publisher: "",
    country: "",
    mediaType: "",
    released: "",
    characters: [],
    povCharacters: []
  }

  characters: Map<number, string> = new Map()
  
  getBook(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.resourceService.getBook(id)
      .subscribe(book => this.book = book);
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

  getCharacterName(character: string): string {
    const id = Number(character.split("/").at(-1) ?? -1)
    if(id >= 0) {
      return this.characters.get(id) ?? ("Unknown character (" + id + ")")
    }
    else {
      return "Character not found"
    }
  }

  getCharacterLink(url: string): string {
    return "/characters/" + url.split("/").at(-1)
  }

  getDate(date: string): string {
    return date.split("T")[0].split("-").reverse().join("/")
  }

  goBack(): void {
    this.location.back();
  }
}
