import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FibExplanationComponent } from './fib-explanation.component';

describe('FibExplanationComponent', () => {
  let component: FibExplanationComponent;
  let fixture: ComponentFixture<FibExplanationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FibExplanationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FibExplanationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
