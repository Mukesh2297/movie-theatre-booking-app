import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScannerPopupComponent } from './scanner-popup.component';

describe('ScannerPopupComponent', () => {
  let component: ScannerPopupComponent;
  let fixture: ComponentFixture<ScannerPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScannerPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScannerPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
