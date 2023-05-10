import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentModule } from './shared/component/component.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './shared/app-material/app-material.module';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';


export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
  keycloak.init({
    config: {
    url: 'http://localhost:8080',
    realm: 'quattys',
    clientId: 'sportive'
    },
  initOptions: {
  onLoad: 'login-required',
  silentCheckSsoRedirectUri:
    window.location.origin + '/assets/silent-check-sso.html'
  }
  });
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    KeycloakAngularModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    }
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
