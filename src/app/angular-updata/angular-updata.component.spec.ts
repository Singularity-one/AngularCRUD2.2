import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularUpdataComponent } from './angular-updata.component';

describe('AngularUpdataComponent', () => {
  let component: AngularUpdataComponent;
  let fixture: ComponentFixture<AngularUpdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularUpdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularUpdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
