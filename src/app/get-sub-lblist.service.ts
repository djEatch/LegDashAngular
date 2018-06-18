import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MasterLB } from './master-lb';
import { Observable, of} from 'rxjs';
import { SubLB } from './sub-lb';
import { map, catchError, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class GetSubLBListService {

  constructor(private http: HttpClient) { }

  getList(MLB:MasterLB): Observable<SubLB[]> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization' : 'Basic ' + btoa(MLB.userName + ':' + MLB.passWord)})
      //headers: new HttpHeaders({'Content-Type': 'application/json', 'X-NITRO-USER' : MLB.userName ,  'X-NITRO-PASS' : MLB.passWord})
    };
    let address: string = "http://" + MLB.address + MLB.endPoint;
    console.log (address);
    return this.http.get(address, httpOptions).pipe(map((res:any) => res.json().lbvserver), tap(val => console.log(val)));
    //return this.http.get(address, httpOptions).pipe(map((res:any) => res.json().lbvserver));
    //return of([]) ;
    //return this.http.get(address,httpOptions).pipe( tap (val => console.log(val)));
  }

  // extractSubLBData(res: string): SubLB[] {
  //   const csvData: string = res;
  //   const allTextLines: string[] = csvData.split(/\r\n|\n/);
  //   const headers: string[] = allTextLines[0].split(",");
  //   const lines: MasterLB[] = [];

  //   for (let i = 1; i < allTextLines.length; i++) {
  //     // split content based on comma
  //     let data = allTextLines[i].split(",");
  //     if (data.length == headers.length) {
  //       let row = new MasterLB(
  //         data[0].replace(/['"]+/g, ""),
  //         data[1].replace(/['"]+/g, ""),
  //         data[2].replace(/['"]+/g, ""),
  //         data[3].replace(/['"]+/g, ""),
  //         data[4].replace(/['"]+/g, "")
  //       );
  //       lines.push(row);
  //     }
  //   }
  //   return lines;
  // }

  // /**
  //  * Handle Http operation that failed.
  //  * Let the app continue.
  //  * @param operation - name of the operation that failed
  //  * @param result - optional value to return as the observable result
  //  */
  // private handleError<T>(operation = "operation", result?: T) {
  //   return (error: any): Observable<T> => {
  //     // TODO: send the error to remote logging infrastructure
  //     console.error(error); // log to console instead

  //     // TODO: better job of transforming error for user consumption
  //     //this.log(`${operation} failed: ${error.message}`);

  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //   };
  // }

}
