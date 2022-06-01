import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniquePathsSolModalComponent } from './unique-paths-sol-modal.component';

describe('UniquePathsSolModalComponent', () => {
  let component: UniquePathsSolModalComponent;
  let fixture: ComponentFixture<UniquePathsSolModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniquePathsSolModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UniquePathsSolModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
