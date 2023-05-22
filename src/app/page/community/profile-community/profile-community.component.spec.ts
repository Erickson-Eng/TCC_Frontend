import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCommunityComponent } from './profile-community.component';

describe('ProfileCommunityComponent', () => {
  let component: ProfileCommunityComponent;
  let fixture: ComponentFixture<ProfileCommunityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileCommunityComponent]
    });
    fixture = TestBed.createComponent(ProfileCommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
