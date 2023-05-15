import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;

  constructor(private jwtHelper: JwtHelperService) {}

  login() {
    // Lógica para autenticar o usuário
    this.isAuthenticated = true;
  }

  logout() {
    // Lógica para deslogar o usuário
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    const access_token = sessionStorage.getItem('access_token');
    return !this.jwtHelper.isTokenExpired(access_token);
  }
}
