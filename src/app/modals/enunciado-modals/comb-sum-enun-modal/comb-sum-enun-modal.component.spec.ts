import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombSumEnunModalComponent } from './comb-sum-enun-modal.component';

describe('CombSumEnunModalComponent', () => {
  let component: CombSumEnunModalComponent;
  let fixture: ComponentFixture<CombSumEnunModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CombSumEnunModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CombSumEnunModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
