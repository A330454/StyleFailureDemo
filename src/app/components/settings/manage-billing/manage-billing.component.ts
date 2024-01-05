import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-billing',
  templateUrl: './manage-billing.component.html',
  styleUrls: ['./manage-billing.component.scss']
})
export class ManageBillingComponent {

  payment: string = 'Visa';

}
