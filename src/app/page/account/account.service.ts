import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Message } from 'src/app/shared/model/Message';
import { User } from 'src/app/shared/model/User';
import { environment } from 'src/environments/enviroment.dev';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  env = environment;

  private readonly API = 'http://localhost:8888/api/v1/user'

  constructor(private http: HttpClient) {}

  createAccount(user: User): Observable<Message>{
    return this.http.post<Message>(this.API, user);
  }

  getHelloWorld(){
    return this.http.get<string>(this.API);
  }
}
