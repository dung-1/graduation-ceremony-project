import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneRingComponent } from './phone-ring.component';

describe('PhoneRingComponent', () => {
  let component: PhoneRingComponent;
  let fixture: ComponentFixture<PhoneRingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhoneRingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhoneRingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
