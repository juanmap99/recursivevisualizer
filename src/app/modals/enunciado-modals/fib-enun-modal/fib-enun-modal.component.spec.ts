import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FibEnunModalComponent } from './fib-enun-modal.component';

describe('FibEnunModalComponent', () => {
  let component: FibEnunModalComponent;
  let fixture: ComponentFixture<FibEnunModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FibEnunModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FibEnunModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
