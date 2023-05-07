import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-create-gym',
  templateUrl: './create-gym.component.html',
  styleUrls: ['./create-gym.component.scss'],
})
export class CreateGymComponent implements OnInit {
  @ViewChild('tabGroup') tabGroup!: MatTabGroup;
  gymForm!: FormGroup;
  selectedTabIndex = 0;

  constructor(private formBuilder: FormBuilder) {}

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
  submitForm(): void {}

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
