import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetSSolModalComponent } from './target-ssol-modal.component';

describe('TargetSSolModalComponent', () => {
  let component: TargetSSolModalComponent;
  let fixture: ComponentFixture<TargetSSolModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TargetSSolModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetSSolModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
