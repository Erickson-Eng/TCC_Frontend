import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { AccountService } from '../account.service';
import { User } from 'src/app/shared/model/User';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorResponse } from 'src/app/shared/model/ErrorResponse';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent implements OnInit {
  @ViewChild('tabGroup') tabGroup!: MatTabGroup;
  isLoading = true;
  private storageKey = 'isDarkThemeActive';
  isDarkThemeActive = true;
  selectedTabIndex = 0;
  optionsAccount = [
    { value: 'Athlete', label: 'Atleta' },
    { value: 'Manager', label: 'Administrador' },
  ];

  userForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    profileType: ['', Validators.required],
    profile: this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      socialName: [''],
      cpf: [''],
      locale: this.fb.group({
        street: ['', Validators.required],
        number: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipCode: ['', Validators.required],
      }),
    }),
  });

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private _snakeBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(this.isDarkThemeActive)
    );
  }

  openSnackBar(message: string, action: string) {
    this._snakeBar.open(message, action);
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.selectedTabIndex = tabChangeEvent.index;
  }

  previousTab() {
    if (this.tabGroup?.selectedIndex && this.tabGroup.selectedIndex > 0) {
      this.tabGroup.selectedIndex = (this.tabGroup.selectedIndex as number) - 1;
    }
  }

  nextTab() {
    if (this.tabIsValid()) {
      this.selectedTabIndex++;
      this.tabGroup.selectedIndex = this.selectedTabIndex;
    }
  }

  tabIsValid() {
    switch (this.selectedTabIndex) {
      case 0:
        return this.isUserFormValid();
      case 1:
        return this.isProfileFormValid();
      case 2:
        return this.isLocaleFormValid();
      default:
        return false;
    }
  }

  validForm(): boolean {
    return (
      this.isUserFormValid() &&
      this.isProfileFormValid() &&
      this.isLocaleFormValid()
    );
  }

  isUserFormValid(): boolean {
    const controls = this.userForm.controls;
    return (
      controls['username']?.valid &&
      controls['email']?.valid &&
      controls['password']?.valid &&
      controls['profileType']?.valid
    );
  }

  isProfileFormValid(): boolean {
    const controls = this.userForm.controls;
    const profileControls = controls['profile'] as FormGroup;
    return (
      profileControls.controls['firstName']?.valid &&
      profileControls.controls['lastName']?.valid
    );
  }

  isLocaleFormValid(): boolean {
    const controls = this.userForm.controls;
    const profileControls = controls['profile'] as FormGroup;
    const localeControls = profileControls.controls['locale'] as FormGroup;

    return (
      localeControls.controls['street']?.valid &&
      localeControls.controls['number']?.valid &&
      localeControls.controls['city']?.valid &&
      localeControls.controls['state']?.valid &&
      localeControls.controls['zipCode']?.valid
    );
  }

  submitForm(): void {
    let user = this.mapUserFormToUser();
    this.accountService.createAccount(user).subscribe(
      (data) => {
        this.openSnackBar(data.content, 'OK');
        this.router.navigate(['/account/auth']);
      }
    );
  }

  mapUserFormToUser(): User {
    const formValues = this.userForm.value;
    const user: User = {
      username: formValues.username,
      email: formValues.email,
      password: formValues.password,
      profileType: formValues.profileType,
      profile: {
        firstName: formValues.profile.firstName,
        lastName: formValues.profile.lastName,
        socialName: formValues.profile.socialName,
        cpf: formValues.profile.cpf,
        locale: {
          street: formValues.profile.locale.street,
          number: formValues.profile.locale.number,
          city: formValues.profile.locale.city,
          state: formValues.profile.locale.state,
          zipCode: formValues.profile.locale.zipCode,
        },
      },
    };
    return user;
  }
}
