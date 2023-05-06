import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/model/User';
import { environment } from 'src/environments/enviroment.dev';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  env = environment;
  constructor(private http: HttpClient) {}

  createAccount(user: User) {
    console.log(user);
    return this.http.post('http://localhost:8888.com/api/v1/user', user);
  }
}
