import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetSProblemComponent } from './target-s-problem.component';

describe('TargetSProblemComponent', () => {
  let component: TargetSProblemComponent;
  let fixture: ComponentFixture<TargetSProblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TargetSProblemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetSProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
