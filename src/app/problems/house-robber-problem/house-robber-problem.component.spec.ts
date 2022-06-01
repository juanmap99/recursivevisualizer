import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseRobberProblemComponent } from './house-robber-problem.component';

describe('HouseRobberProblemComponent', () => {
  let component: HouseRobberProblemComponent;
  let fixture: ComponentFixture<HouseRobberProblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseRobberProblemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseRobberProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
