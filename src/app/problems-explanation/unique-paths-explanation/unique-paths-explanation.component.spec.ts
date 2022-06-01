import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniquePathsExplanationComponent } from './unique-paths-explanation.component';

describe('UniquePathsExplanationComponent', () => {
  let component: UniquePathsExplanationComponent;
  let fixture: ComponentFixture<UniquePathsExplanationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniquePathsExplanationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UniquePathsExplanationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
