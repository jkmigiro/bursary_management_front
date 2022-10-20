import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDetailsStudentComponent } from './app-details-student.component';

describe('AppDetailsStudentComponent', () => {
  let component: AppDetailsStudentComponent;
  let fixture: ComponentFixture<AppDetailsStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppDetailsStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppDetailsStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
