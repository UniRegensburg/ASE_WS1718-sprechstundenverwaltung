import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficehoursDialogComponent } from './officehours-dialog.component';

describe('OfficehoursDialogComponent', () => {
  let component: OfficehoursDialogComponent;
  let fixture: ComponentFixture<OfficehoursDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficehoursDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficehoursDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
