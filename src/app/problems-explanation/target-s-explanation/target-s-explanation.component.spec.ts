import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetSExplanationComponent } from './target-s-explanation.component';

describe('TargetSExplanationComponent', () => {
  let component: TargetSExplanationComponent;
  let fixture: ComponentFixture<TargetSExplanationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TargetSExplanationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetSExplanationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
