import { Component } from '@angular/core';
import { ResourceService } from '../resource.service';
import { Router } from '@angular/router';
import { Book } from '../book';
import { Location } from '@angular/common';

@Component({
  selector: 'books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent {

  constructor(private resourceService: ResourceService, private router: Router, private location: Location) {}

  ngOnInit(): void {
    this.getBooks()
  }

  books: Book[] = [];
  id: number = 0;

  getBooks() {
    this.resourceService.getBooks().subscribe(books => this.books = books)
  }

  getBookId(book: Book): string {
    return book.url.split("/").at(-1) ?? ""
  }

  goBack(): void {
    this.location.back();
  }
}
