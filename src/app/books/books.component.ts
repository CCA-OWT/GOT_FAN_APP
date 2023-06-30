import { Component } from '@angular/core';
import { ResourceService } from '../resource.service';
import { Book } from '../book';
import { Location } from '@angular/common';

@Component({
  selector: 'books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent {

  constructor(private resourceService: ResourceService, private location: Location) {}

  ngOnInit(): void {
    this.getBooks()
  }

  books: Set<Book> = new Set();

  search: string = ""

  getBooks() {
    this.resourceService.getBooks().subscribe(books => {
      books.forEach(book => this.books.add(book))
    })
  }

  searchTerm(search: string): void {
    this.search = search
  }

  displayBooks(): Set<Book> {
    let result = new Set<Book>;
    this.books.forEach(book => {
      if(book.name.toLowerCase().includes(this.search.toLowerCase())) {
        result.add(book);
      }
      else if(book.isbn.toLowerCase().includes(this.search.toLowerCase())) {
        result.add(book);
      }
      else if(book.authors.some(author => author.toLowerCase().includes(this.search.toLowerCase()))) {
        result.add(book);
      }
      else if(book.publisher.toLowerCase().includes(this.search.toLowerCase())) {
        result.add(book);
      }
      else if(book.mediaType.toLowerCase().includes(this.search.toLowerCase())) {
        result.add(book);
      }
      else if(book.country.toString().includes(this.search.toLowerCase())) {
        result.add(book);
      }
      else if(this.getDate(book.released).includes(this.search.toLowerCase())) {
        result.add(book);
      }
      else if(book.numberOfPages.toString().includes(this.search.toLowerCase())) {
        result.add(book);
      }
    })
    return result
  }

  getBookId(book: Book): string {
    return book.url.split("/").at(-1) ?? ""
  }

  getDate(date: string): string {
    return date.split("T")[0].split("-").reverse().join("/")
  }

  goBack(): void {
    this.location.back();
  }
}
