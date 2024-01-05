import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyInfoCardsComponent } from './company-info-cards.component';

describe('CompanyInfoCardsComponent', () => {
  let component: CompanyInfoCardsComponent;
  let fixture: ComponentFixture<CompanyInfoCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyInfoCardsComponent]
    });
    fixture = TestBed.createComponent(CompanyInfoCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
