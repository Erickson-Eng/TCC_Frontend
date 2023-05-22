import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { AuthResponse } from 'src/app/shared/model/AuthResponse';
import { Message } from 'src/app/shared/model/Message';
import { User } from 'src/app/shared/model/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private env = environment;

  constructor(private http: HttpClient) {}

  loginBackend(
    usernameOrEmail: string,
    password: string
  ): Observable<AuthResponse> {
    const login = { usernameOrEmail, password };
    return this.http.post<AuthResponse>(`${this.env.apiUrl}/user/login`, login);
  }

  createAccount(user: User): Observable<Message> {
    return this.http.post<Message>(`${this.env.apiUrl}/user`, user);
  }
}
