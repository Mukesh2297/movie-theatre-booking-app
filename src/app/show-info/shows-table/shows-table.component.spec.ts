import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowsTableComponent } from './shows-table.component';

describe('ShowsTableComponent', () => {
  let component: ShowsTableComponent;
  let fixture: ComponentFixture<ShowsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
