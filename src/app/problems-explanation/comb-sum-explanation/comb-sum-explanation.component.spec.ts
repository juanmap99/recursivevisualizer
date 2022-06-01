import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombSumExplanationComponent } from './comb-sum-explanation.component';

describe('CombSumExplanationComponent', () => {
  let component: CombSumExplanationComponent;
  let fixture: ComponentFixture<CombSumExplanationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CombSumExplanationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CombSumExplanationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
