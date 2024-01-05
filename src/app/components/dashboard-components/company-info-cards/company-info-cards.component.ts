import { Component } from '@angular/core';

@Component({
  selector: 'app-company-info-cards',
  templateUrl: './company-info-cards.component.html',
  styleUrls: ['./company-info-cards.component.scss']
})
export class CompanyInfoCardsComponent {



  ngOnInit(): void {
    this.cardMenuItems()
  }

  // Info Cards
  items:any;
  expiredCertificates: any;
  totalCourses:any;

  cardMenuItems() {
    this.expiredCertificates = [
      {
          label: 'Firstname Lastname',
          icon: 'pi pi-fw pi-user',
      },
      {
        label: 'Firstname Lastname',
        icon: 'pi pi-fw pi-user',
      },
      {
        label: 'Firstname Lastname',
        icon: 'pi pi-fw pi-user',
      },
      {
        label: 'Firstname Lastname',
        icon: 'pi pi-fw pi-user',
      },
      {
        label: 'Firstname Lastname',
        icon: 'pi pi-fw pi-user',
      },
    ];

    this.totalCourses = [
      {
          label: 'Course Name',
          icon: 'pi pi-fw pi-car',
      },
      {
        label: 'Course Name',
        icon: 'pi pi-fw pi-car',
      }
    ];
  }

}
