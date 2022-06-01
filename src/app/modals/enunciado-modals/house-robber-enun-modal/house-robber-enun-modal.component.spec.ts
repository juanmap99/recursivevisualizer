import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseRobberEnunModalComponent } from './house-robber-enun-modal.component';

describe('HouseRobberEnunModalComponent', () => {
  let component: HouseRobberEnunModalComponent;
  let fixture: ComponentFixture<HouseRobberEnunModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseRobberEnunModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseRobberEnunModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
