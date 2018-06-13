import { Injectable} from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Server} from './server';
import {Servers} from './servers';
import {catchError, tap, map} from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/text'}),
  
};

@Injectable({
  providedIn: 'root'
})
export class GetserverlistService {

  constructor(private http: HttpClient) { }


  getList():Observable<Server[]>{

    return this.http.get('assets/servers.txt',{responseType: 'text'} )
    .pipe(
      map((data) => { let myArray: Server[]; 
                      myArray = this.extractServerData(data); 
                      return myArray;
                    }),
      catchError(this.handleError<Server[]>('getList',[]))
    );
  
  }

  extractServerData(res: string): Server[] {

    const csvData: string = res;
    const allTextLines: string[] = csvData.split(/\r\n|\n/);
    const headers: string[] = allTextLines[0].split(',');
    const lines:Server[] = [];

    for ( let i = 1; i < allTextLines.length; i++) {
        // split content based on comma
        let data = allTextLines[i].split(',');
        if (data.length == headers.length) {
            let row = new Server(data[0].replace(/['"]+/g, ''),data[1].replace(/['"]+/g, ''),data[2].replace(/['"]+/g, ''),data[3].replace(/['"]+/g, ''));
            lines.push(row);
        }
    }
    return lines;
    //console.log(lines);
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
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}



