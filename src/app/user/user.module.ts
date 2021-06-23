import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from "../shared/shared.module";

import { LoginPageComponent } from './login-page/login-page.component';
import { GoogleSigninDirective } from './google-signin.directive';
import { EmailLoginComponent } from './email-login/email-login.component';


@NgModule({
  declarations: [LoginPageComponent, GoogleSigninDirective, EmailLoginComponent],
  imports: [
    UserRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class UserModule { }
