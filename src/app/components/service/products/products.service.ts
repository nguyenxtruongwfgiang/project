import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../../products/products';
import { Categories } from '../../heading/categories';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  configUrl: string = 'https://6289b1e75da6ddfd5d5ad2aa.mockapi.io/api/myproject/products';

  private _categoryId: number = 0;

  nextCategoriId = new Subject<number>();

  constructor(private http: HttpClient) {

  }

  get categoryId(): number {
    return this._categoryId;
  }

  set categoryId(a: number) {
    this._categoryId = a;
  }

  getProducts() {
    return this.http.get<Product>(this.configUrl).pipe(map((resp: any) => {
      return resp;
    }));
  }

  getCategories(){
    return this.http.get<Categories>('https://6289b1e75da6ddfd5d5ad2aa.mockapi.io/api/myproject/categories')
    .pipe(map((res: Categories) => {
      return res;
    }))
  }
}
