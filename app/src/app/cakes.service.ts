import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Cake } from 'src/app/cake.model';

@Injectable({
  providedIn: 'root'
})
export class CakesService {

  constructor(private http: HttpClient) { }

  list(): Observable<Cake[]>{
    const url = `${environment.apiURL}/cakes`;
    return this.http.get<any>(url).pipe(map(r => r.cakes.map(c => new Cake(c))));
  }

  getOne(id: number): Observable<Cake> {
    const url = `${environment.apiURL}/cakes/${id}`;
    return this.http.get<any>(url).pipe(map(r => new Cake(r.cake)));
  }
  
  create(cake: Cake): Observable<Cake> {
    const url = `${environment.apiURL}/cakes`;
    return this.http.post<any>(url, cake).pipe(map(r => new Cake(r.cake)));
  }
  
  update(cake: Cake): Observable<Cake> {
    const url = `${environment.apiURL}/cakes/${cake.id}`;
    return this.http.put<any>(url, cake).pipe(map(r => new Cake(r.cake)));
  }
  
  delete(cake: Cake): Observable<Cake> {
    const url = `${environment.apiURL}/cakes/${cake.id}`;
    return this.http.delete<any>(url).pipe(map(r => new Cake(r.cake)));
  }
}
