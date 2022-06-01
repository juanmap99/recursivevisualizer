import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseRobberExplanationComponent } from './house-robber-explanation.component';

describe('HouseRobberExplanationComponent', () => {
  let component: HouseRobberExplanationComponent;
  let fixture: ComponentFixture<HouseRobberExplanationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseRobberExplanationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseRobberExplanationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
