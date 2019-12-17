import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindAllWithAgeComponent } from './find-all-with-age.component';

describe('FindAllWithAgeComponent', () => {
  let component: FindAllWithAgeComponent;
  let fixture: ComponentFixture<FindAllWithAgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindAllWithAgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindAllWithAgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
