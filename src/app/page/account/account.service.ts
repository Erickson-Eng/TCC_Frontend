import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Message } from 'src/app/shared/model/Message';
import { User } from 'src/app/shared/model/User';
import keycloak from 'src/config/keycloak-config';
import { environment } from 'src/environments/enviroment.dev';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  env = environment;

  private readonly API = 'http://localhost:8888/api/v1/user'

  constructor(private http: HttpClient) {}



  init() {
    return new Promise((resolve, reject) => {
      keycloak.init({ onLoad: 'login-required' })
        .then((auth) => {
          resolve(auth);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  login() {
    keycloak.login();
  }

  logout() {
    keycloak.logout();
  }

  isLoggedIn() {
    return keycloak.authenticated;
  }

  getToken() {
    return keycloak.token;
  }




  createAccount(user: User): Observable<Message>{
    return this.http.post<Message>(this.API, user);
  }



}
