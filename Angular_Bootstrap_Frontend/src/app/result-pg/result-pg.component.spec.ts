import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultPGComponent } from './result-pg.component';

describe('ResultPGComponent', () => {
  let component: ResultPGComponent;
  let fixture: ComponentFixture<ResultPGComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultPGComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultPGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
