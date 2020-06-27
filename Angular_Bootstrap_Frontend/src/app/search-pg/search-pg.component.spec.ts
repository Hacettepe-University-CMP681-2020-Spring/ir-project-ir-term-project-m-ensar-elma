import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPGComponent } from './search-pg.component';

describe('SearchPGComponent', () => {
  let component: SearchPGComponent;
  let fixture: ComponentFixture<SearchPGComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPGComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
