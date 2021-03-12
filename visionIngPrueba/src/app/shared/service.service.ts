import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscriber } from 'rxjs-compat';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Customer } from './customer.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  readonly URL = environment.apiURL;
  private _refresh$ = new Subject<void>();
  constructor(private http : HttpClient) { }

  get refresh$(){
    return this._refresh$;
  }

  getCustomers(): Observable<any>{    
    return this.http.get(`${this.URL}/Customers`);
  }

  postCustomers(data:Customer): Observable<any>{
    return this.http.post(`${this.URL}/Customers`,data)
    .pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
    ;

  }
}
