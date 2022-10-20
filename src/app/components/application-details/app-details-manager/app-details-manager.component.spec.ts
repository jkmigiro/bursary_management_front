import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDetailsManagerComponent } from './app-details-manager.component';

describe('AppDetailsManagerComponent', () => {
  let component: AppDetailsManagerComponent;
  let fixture: ComponentFixture<AppDetailsManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppDetailsManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppDetailsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
