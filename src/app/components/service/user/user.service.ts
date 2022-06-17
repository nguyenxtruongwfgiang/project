import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../../signup/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  configUrl: string = 'https://6289b1e75da6ddfd5d5ad2aa.mockapi.io/api/myproject/users';
  url: string = 'https://provinces.open-api.vn/api/'
  constructor(private http: HttpClient) {

  }

  registerUser(username: string, password: string) {
    this.http.post<any>(this.configUrl, { username, password });
  }


  getUser() {
    return this.http.get<User>(this.configUrl).pipe(map((res: any) => {
      return res;
    }))
  }

  getCityData() {
    return this.http.get<any>(this.url).pipe(map((res: any) => {
      console.log(res);
      return res;
    }))
  }

  getCheckoutDetails() {
    return this
      .http.get<any>('https://6289b1e75da6ddfd5d5ad2aa.mockapi.io/api/myproject/paymet').pipe(map((value: any) => {
        return value;
      }))
  }

}
