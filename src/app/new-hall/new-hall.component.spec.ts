import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHallComponent } from './new-hall.component';

describe('NewHallComponent', () => {
  let component: NewHallComponent;
  let fixture: ComponentFixture<NewHallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewHallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewHallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
