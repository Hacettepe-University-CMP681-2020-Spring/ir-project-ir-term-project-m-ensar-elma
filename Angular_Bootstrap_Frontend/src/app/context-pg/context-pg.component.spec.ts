import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextPGComponent } from './context-pg.component';

describe('ContextPGComponent', () => {
  let component: ContextPGComponent;
  let fixture: ComponentFixture<ContextPGComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContextPGComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextPGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
