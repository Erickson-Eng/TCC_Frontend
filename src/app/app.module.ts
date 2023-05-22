import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentModule } from './shared/component/component.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './shared/app-material/app-material.module';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { environment } from '../environments/environment';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { InterceptorModule } from './interceptor/interceptor.module';

export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: `${environment.apiUrl}`,
        realm: 'quattys',
        clientId: 'sportive',
      },
      initOptions: {
        onLoad: 'login-required',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html',
      },
    });
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return sessionStorage.getItem('access_token');
        },
        headerName: 'Authorization',
        authScheme: 'Bearer ',
      },
    }),
    BrowserModule,
    AppRoutingModule,
    ComponentModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    KeycloakAngularModule,
    InterceptorModule,
  ],
  providers: [JwtHelperService],
  bootstrap: [AppComponent],
})
export class AppModule {}
