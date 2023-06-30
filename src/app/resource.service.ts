import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { Book } from './book';
import { Character } from './character';
import { House } from './house';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://anapioficeandfire.com/api/';
  private booksApirUrl = this.apiUrl + "books";
  private charactersApirUrl = this.apiUrl + "characters";
  private housesApirUrl = this.apiUrl + "houses";

  getBooks(): Observable<Book[]> {
    const url = `${this.booksApirUrl}?page=1&pageSize=50`; // only page 1
    return this.http.get<Book[]>(url).pipe(
      catchError(this.handleError<Book[]>('getBooks()'))
    );
  }

  getBook(id: number): Observable<Book> {
    const url = `${this.booksApirUrl}/${id}`;
    return this.http.get<Book>(url).pipe(
      catchError(this.handleError<Book>(`getBook(${id})`))
    );
  }

  getCharacters(i: number): Observable<Character[]> {
    const url = `${this.charactersApirUrl}?page=${i}&pageSize=50`; // page 1 -> page 43
    return this.http.get<Character[]>(url).pipe(
      catchError(this.handleError<Character[]>('getCharacter()'))
    );
  }

  getCharacter(id: number): Observable<Character> {
    const url = `${this.charactersApirUrl}/${id}`;
    return this.http.get<Character>(url).pipe(
      catchError(this.handleError<Character>(`getCharacter(${id})`))
    );
  }

  getHouses(i: number): Observable<House[]> {
    const url = `${this.housesApirUrl}?page=${i}&pageSize=50`; // page 1 -> page 9
    return this.http.get<House[]>(url).pipe(
      catchError(this.handleError<House[]>('getHouses()'))
    );
  }

  getHouse(id: number): Observable<House> {
    const url = `${this.housesApirUrl}/${id}`;
    return this.http.get<House>(url).pipe(
      catchError(this.handleError<House>(`getHouse(${id})`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      console.error(error);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
