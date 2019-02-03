import { Injectable } from '@angular/core';
// import { LISTLISTS } from './mock-lists';
import { List } from './list';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, filter, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private listsUrl = 'api/lists';  // URL to web api

  constructor(private http: HttpClient,
              private messageService: MessageService) { }

  getLists(): Observable<List[]> {
    console.log('DataService getLists');
    // this.messageService.add('"DataService: fetched Lists"');
    return this.http.get<List[]>(this.listsUrl)
          .pipe(
            tap(_ => this.log('fetched Lists"')),
            catchError(this.handleError('getLists', []))
          );
  }

  getList(id: number): Observable<List> {
    console.log('servise id=', id);
    const url = `${this.listsUrl}/${id}`;
    console.log('servise url=', url);
    // return of(LISTLISTS.find(list => list.id === id));

    return this.http.get<List>(url).pipe(
      tap(_ => this.log(`fetched List id=${id}`)),
      catchError(this.handleError<List>(`getList  id=${id}`))
    );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`"DataService:  ${message}`);
  }

  /** PUT: update the hero on the server */
  updateData (data: List): Observable<any> {
    console.log('**updateData ');
    return this.http.put(this.listsUrl, data, httpOptions).pipe(
      tap(_ => this.log(`updated data id=${data.id}`)),
      catchError(this.handleError<any>('updateData'))
    );
  }
}

