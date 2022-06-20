import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrosErroneosComponent } from './parametros-erroneos.component';

describe('ParametrosErroneosComponent', () => {
  let component: ParametrosErroneosComponent;
  let fixture: ComponentFixture<ParametrosErroneosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametrosErroneosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametrosErroneosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
