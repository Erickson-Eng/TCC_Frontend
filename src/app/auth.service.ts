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

  getRoles(): string[] {
    const access_token = sessionStorage.getItem('access_token');
    const decodedToken = this.jwtHelper.decodeToken(access_token!);
    const realmRoles = decodedToken.realm_access.roles;
    return realmRoles;
  }

  getEmail(): string {
    const access_token = sessionStorage.getItem('access_token');
    const decodedToken = this.jwtHelper.decodeToken(access_token!);
    const realmRoles = decodedToken.email;
    return realmRoles;
  }

  getUsername(): string{
    const access_token = sessionStorage.getItem('access_token');
    const decodedToken = this.jwtHelper.decodeToken(access_token!);
    const realmRoles = decodedToken.preferred_username;
    return realmRoles;
  }

  isLoggedIn(): boolean {
    const access_token = sessionStorage.getItem('access_token');
    return !this.jwtHelper.isTokenExpired(access_token);
  }
}
