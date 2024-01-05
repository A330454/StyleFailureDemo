import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffInviteComponent } from './staff-invite.component';

describe('StaffInviteComponent', () => {
  let component: StaffInviteComponent;
  let fixture: ComponentFixture<StaffInviteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaffInviteComponent]
    });
    fixture = TestBed.createComponent(StaffInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
