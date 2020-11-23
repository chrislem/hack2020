import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginationComponent } from './origination.component';


describe('OriginationComponent', () => {
  let component: OriginationComponent;
  let fixture: ComponentFixture<OriginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OriginationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OriginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
