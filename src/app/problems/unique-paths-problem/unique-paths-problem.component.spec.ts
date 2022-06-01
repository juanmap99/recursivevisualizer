import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniquePathsProblemComponent } from './unique-paths-problem.component';

describe('UniquePathsProblemComponent', () => {
  let component: UniquePathsProblemComponent;
  let fixture: ComponentFixture<UniquePathsProblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniquePathsProblemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UniquePathsProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
