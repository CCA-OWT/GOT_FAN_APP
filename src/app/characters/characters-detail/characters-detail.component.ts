import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Character } from 'src/app/character';
import { ActivatedRoute } from '@angular/router';
import { ResourceService } from 'src/app/resource.service';

@Component({
  selector: 'app-characters-detail',
  templateUrl: './characters-detail.component.html',
  styleUrls: ['./characters-detail.component.css']
})
export class CharactersDetailComponent {

  constructor(
    private route: ActivatedRoute,
    private resourceService: ResourceService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getCharacter();
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
  
  getCharacter(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.resourceService.getCharacter(id)
      .subscribe(character => this.character = character);
  }

  goBack(): void {
    this.location.back();
  }
}