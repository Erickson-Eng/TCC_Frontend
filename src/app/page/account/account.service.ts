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
    return this.http.post(`http://localhost:8888/api/v1/user`, user);
  }
}
