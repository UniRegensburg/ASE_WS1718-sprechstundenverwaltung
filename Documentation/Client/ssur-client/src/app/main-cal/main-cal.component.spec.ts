import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCalComponent } from './main-cal.component';

describe('MainCalComponent', () => {
  let component: MainCalComponent;
  let fixture: ComponentFixture<MainCalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainCalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainCalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
