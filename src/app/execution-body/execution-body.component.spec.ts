import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutionBodyComponent } from './execution-body.component';

describe('ExecutionBodyComponent', () => {
  let component: ExecutionBodyComponent;
  let fixture: ComponentFixture<ExecutionBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExecutionBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutionBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
