import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HallInfoComponent } from './hall-info.component';

describe('HallInfoComponent', () => {
  let component: HallInfoComponent;
  let fixture: ComponentFixture<HallInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HallInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HallInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
