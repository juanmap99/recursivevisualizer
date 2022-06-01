import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseRobberSolModalComponent } from './house-robber-sol-modal.component';

describe('HouseRobberSolModalComponent', () => {
  let component: HouseRobberSolModalComponent;
  let fixture: ComponentFixture<HouseRobberSolModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseRobberSolModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseRobberSolModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
