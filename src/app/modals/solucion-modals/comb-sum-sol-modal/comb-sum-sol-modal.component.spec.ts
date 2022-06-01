import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombSumSolModalComponent } from './comb-sum-sol-modal.component';

describe('CombSumSolModalComponent', () => {
  let component: CombSumSolModalComponent;
  let fixture: ComponentFixture<CombSumSolModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CombSumSolModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CombSumSolModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
