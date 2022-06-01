import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FibSolModalComponent } from './fib-sol-modal.component';

describe('FibSolModalComponent', () => {
  let component: FibSolModalComponent;
  let fixture: ComponentFixture<FibSolModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FibSolModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FibSolModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
