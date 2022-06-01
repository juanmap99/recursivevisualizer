import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombSumProblemComponent } from './comb-sum-problem.component';

describe('CombSumProblemComponent', () => {
  let component: CombSumProblemComponent;
  let fixture: ComponentFixture<CombSumProblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CombSumProblemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CombSumProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
