import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { GymService } from '../gym.service';
import { Gym } from 'src/app/shared/model/Gym';
import { Locale } from 'src/app/shared/model/Locale';
import { switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-gym',
  templateUrl: './create-gym.component.html',
  styleUrls: ['./create-gym.component.scss'],
})
export class CreateGymComponent implements OnInit {
  @ViewChild('tabGroup') tabGroup!: MatTabGroup;
  gymForm!: FormGroup;
  selectedTabIndex = 0;

  constructor(
    private formBuilder: FormBuilder,
    private service: GymService,
    private router: Router,
    private _snakeBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.gymForm = this.formBuilder.group({
      name: [
        '',
        Validators.compose([Validators.required, Validators.minLength(5)]),
      ],
      shortDescription: ['', [Validators.required]],
      rules: [''],
      locale: this.formBuilder.group({
        street: ['', Validators.required],
        number: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipCode: ['', Validators.required],
      }),
    });
  }

  openSnackBar(message: string, action: string) {
    this._snakeBar.open(message, action);
  }

  submitForm() {
    let gym = this.mapFormBuilderToGym();
    this.service
      .createLocale(gym.locale)
      .pipe(
        tap((createdLocale: Locale) => {
          gym.localeId = createdLocale.id;
          console.log(createdLocale);
        }),
        switchMap(() => this.service.createGym(gym))
      )
      .subscribe();
      this.openSnackBar("Ginásio criado com sucesso", 'OK');
      this.router.navigate(['/gym/list']);
  }

  mapFormBuilderToGym(): Gym {
    const values = this.gymForm.value;
    const gym: Gym = {
      name: values.name,
      shortDescription: values.shortDescription,
      locale: {
        street: values.locale.street,
        number: values.locale.number,
        city: values.locale.city,
        state: values.locale.state,
        zipCode: values.locale.zipCode,
      },
    };
    if (values.rules) {
      gym.rules = values.rules;
    }

    return gym;
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
        return this.isGymFormValid();
      case 1:
        return this.isLocaleFormValid();
      default:
        return false;
    }
  }

  validForm() {
    return this.isGymFormValid() && this.isLocaleFormValid();
  }

  isGymFormValid() {
    const controls = this.gymForm.controls;
    return controls['name']?.valid && controls['shortDescription']?.valid;
  }

  isLocaleFormValid() {
    const controls = this.gymForm.controls;
    const localeControls = controls['locale'] as FormGroup;
    return (
      localeControls.controls['street']?.valid &&
      localeControls.controls['number']?.valid &&
      localeControls.controls['city']?.valid &&
      localeControls.controls['state']?.valid &&
      localeControls.controls['zipCode']?.valid
    );
  }
}
