import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileGymComponent } from './profile-gym.component';

describe('ProfileGymComponent', () => {
  let component: ProfileGymComponent;
  let fixture: ComponentFixture<ProfileGymComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileGymComponent]
    });
    fixture = TestBed.createComponent(ProfileGymComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
