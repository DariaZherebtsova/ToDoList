import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListListsComponent } from './list-lists.component';

describe('ListListsComponent', () => {
  let component: ListListsComponent;
  let fixture: ComponentFixture<ListListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
