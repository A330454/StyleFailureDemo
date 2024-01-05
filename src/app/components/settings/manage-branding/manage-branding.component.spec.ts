import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBrandingComponent } from './manage-branding.component';

describe('ManageBrandingComponent', () => {
  let component: ManageBrandingComponent;
  let fixture: ComponentFixture<ManageBrandingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageBrandingComponent]
    });
    fixture = TestBed.createComponent(ManageBrandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
