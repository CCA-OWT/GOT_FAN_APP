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
    return this.http.get<Book[]>(this.booksApirUrl).pipe(
      tap(_ => console.log('getBooks() successfully')),
      catchError(this.handleError<Book[]>('getBooks()'))
    );
  }

  getBook(id: number): Observable<Book> {
    const url = `${this.booksApirUrl}/${id}`;
    return this.http.get<Book>(url).pipe(
      tap(_ => console.log(`getBook(${id}) successfully`)),
      catchError(this.handleError<Book>(`getBook(${id})`))
    );
  }

  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(this.charactersApirUrl).pipe(
      tap(_ => console.log('getCharacter() successfully')),
      catchError(this.handleError<Character[]>('getCharacter()'))
    );
  }

  getCharacter(id: number): Observable<Character> {
    const url = `${this.charactersApirUrl}/${id}`;
    return this.http.get<Character>(url).pipe(
      tap(_ => console.log(`getCharacter(${id}) successfully`)),
      catchError(this.handleError<Character>(`getCharacter(${id})`))
    );
  }

  getHouses(): Observable<House[]> {
    return this.http.get<House[]>(this.housesApirUrl).pipe(
      tap(_ => console.log('getHouses() successfully')),
      catchError(this.handleError<House[]>('getHouses()'))
    );
  }

  getHouse(id: number): Observable<House> {
    const url = `${this.housesApirUrl}/${id}`;
    return this.http.get<House>(url).pipe(
      tap(_ => console.log(`getHouse(${id}) successfully`)),
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

  //https://anapioficeandfire.com/

  //Use case 0 ✅
    //Create the general layout

  //Use case 1 ✅
    //The user opens your app and gets a login screen. He has to login. After a successful login he is navigated to the overview page (UC2)
    //(Bonus: If the user is logged in, he can refresh the browser and has not to login again)
    //(Note: To simplify this task, handle the authentication locally in your app and not consume any external services like auth0)

  //Use case 2
    //The user has a list of Game of thrones resources, for each resource he can show a list where he can filter elements of the list

  //Use case 3
    //The list(s) in UC2 should be extended. Add a search element, which searches anything in your resources

  //Use case 4
    //The user clicks on a resource item and gets a detail view over it.   
}
