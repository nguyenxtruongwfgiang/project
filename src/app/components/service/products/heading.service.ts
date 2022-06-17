import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categories } from '../../heading/categories';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeadingService {
  configUrl: string = 'https://6289b1e75da6ddfd5d5ad2aa.mockapi.io/api/myproject/categories'
  constructor(private http: HttpClient) { }

  getCategories(){
    return this.http.get<Categories>(this.configUrl)
    .pipe(map((res: Categories) => {
      return res;
    }))
  }
}
