import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCorporateUsersComponent } from './manage-corporate-users.component';

describe('ManageCorporateUsersComponent', () => {
  let component: ManageCorporateUsersComponent;
  let fixture: ComponentFixture<ManageCorporateUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageCorporateUsersComponent]
    });
    fixture = TestBed.createComponent(ManageCorporateUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
