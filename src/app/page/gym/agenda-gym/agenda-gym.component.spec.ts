import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaGymComponent } from './agenda-gym.component';

describe('AgendaGymComponent', () => {
  let component: AgendaGymComponent;
  let fixture: ComponentFixture<AgendaGymComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgendaGymComponent]
    });
    fixture = TestBed.createComponent(AgendaGymComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
