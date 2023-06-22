import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/book';
import { ResourceService } from 'src/app/resource.service';

@Component({
  selector: 'app-books-detail',
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
  
  getBook(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.resourceService.getBook(id)
      .subscribe(book => this.book = book);
  }

  goBack(): void {
    this.location.back();
  }
}
