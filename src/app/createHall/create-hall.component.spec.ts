import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHallComponent } from './create-hall.component';

describe('CreateHallComponent', () => {
  let component: CreateHallComponent;
  let fixture: ComponentFixture<CreateHallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateHallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
