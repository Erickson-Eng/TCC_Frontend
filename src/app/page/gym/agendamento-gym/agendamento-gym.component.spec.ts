import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendamentoGymComponent } from './agendamento-gym.component';

describe('AgendamentoGymComponent', () => {
  let component: AgendamentoGymComponent;
  let fixture: ComponentFixture<AgendamentoGymComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgendamentoGymComponent]
    });
    fixture = TestBed.createComponent(AgendamentoGymComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
