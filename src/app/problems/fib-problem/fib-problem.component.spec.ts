import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FibProblemComponent } from './fib-problem.component';

describe('FibProblemComponent', () => {
  let component: FibProblemComponent;
  let fixture: ComponentFixture<FibProblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FibProblemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FibProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
