import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetSEnunModalComponent } from './target-senun-modal.component';

describe('TargetSEnunModalComponent', () => {
  let component: TargetSEnunModalComponent;
  let fixture: ComponentFixture<TargetSEnunModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TargetSEnunModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetSEnunModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
