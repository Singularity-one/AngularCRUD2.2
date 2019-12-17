import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindAllWithPageComponent } from './find-all-with-page.component';

describe('FindAllWithPageComponent', () => {
  let component: FindAllWithPageComponent;
  let fixture: ComponentFixture<FindAllWithPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindAllWithPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindAllWithPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
