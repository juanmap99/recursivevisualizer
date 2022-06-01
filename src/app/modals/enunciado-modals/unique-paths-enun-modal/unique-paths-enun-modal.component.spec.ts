import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniquePathsEnunModalComponent } from './unique-paths-enun-modal.component';

describe('UniquePathsEnunModalComponent', () => {
  let component: UniquePathsEnunModalComponent;
  let fixture: ComponentFixture<UniquePathsEnunModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniquePathsEnunModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UniquePathsEnunModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
