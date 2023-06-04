import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';

interface Login {
  usernameOrEmail: string;
  password: string;
}

@Component({
  selector: 'app-login-account',
  templateUrl: './login-account.component.html',
  styleUrls: ['./login-account.component.scss'],
})
export class LoginAccountComponent implements OnInit {
  hide = true;

  constructor(
    private fb: FormBuilder,
    private service: AccountService,
    private router: Router
  ) {}
  ngOnInit(): void {}

  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  submitForm(): void {
    const formValues = this.loginForm.value;
    const login: Login = {
      usernameOrEmail: formValues.username,
      password: formValues.password,
    };

    this.service
      .loginBackend(login.usernameOrEmail, login.password)
      .subscribe((data) => {
        sessionStorage.setItem('access_token', data.access_token);
        sessionStorage.setItem('expires_in', data.expires_in.toString());
        sessionStorage.setItem(
          'refresh_expires_in',
          data.refresh_expires_in.toString()
        );
        sessionStorage.setItem('refresh_token', data.refresh_token);
        sessionStorage.setItem('token_type', data.token_type);
        sessionStorage.setItem(
          'not-before-policy',
          data['not-before-policy'].toString()
        );
        sessionStorage.setItem('session_state', data.session_state);
        sessionStorage.setItem('scope', data.scope);
        this.router.navigate(['/home']);
      });
  }

  isUserFormValid(): boolean{
    const controls = this.loginForm.controls;
    return (
      controls['username']?.valid &&
      controls['password']?.valid
    );
  }
}
