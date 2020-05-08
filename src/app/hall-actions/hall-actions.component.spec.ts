import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HallActionsComponent } from './hall-actions.component';

describe('HallActionsComponent', () => {
  let component: HallActionsComponent;
  let fixture: ComponentFixture<HallActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HallActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HallActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
