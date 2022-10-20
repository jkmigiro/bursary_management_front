import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDetailsAdminComponent } from './app-details-admin.component';

describe('AppDetailsAdminComponent', () => {
  let component: AppDetailsAdminComponent;
  let fixture: ComponentFixture<AppDetailsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppDetailsAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppDetailsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
