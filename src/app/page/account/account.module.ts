import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { CreateAccountComponent } from './create-account/create-account.component';
import { LoginAccountComponent } from './login-account/login-account.component';
import { RecoveryAccountComponent } from './recovery-account/recovery-account.component';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { ComponentModule } from 'src/app/shared/component/component.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AccountService } from './account.service';
import { KeycloakAngularModule } from 'keycloak-angular';

@NgModule({
  declarations: [
    CreateAccountComponent,
    LoginAccountComponent,
    RecoveryAccountComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    AppMaterialModule,
    ComponentModule,
    ReactiveFormsModule,
    HttpClientModule,
    KeycloakAngularModule
  ],
  providers: [AccountService],
})
export class AccountModule {}
