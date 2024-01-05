import { Component } from '@angular/core';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { StrapiService } from 'src/app/services/Backend/strapi.service';
@Component({
  selector: 'app-manage-corporate-users',
  templateUrl: './manage-corporate-users.component.html',
  styleUrls: ['./manage-corporate-users.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ManageCorporateUsersComponent {

  constructor( private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private StrapiService:StrapiService
) {}

  corporate_users:any;

  ngOnInit(): void {
    this.getAccounts()
    this.tableMenus()
  }

  // Users
  accounts:any;

  getAccounts() {
    this.StrapiService.getAdminUsersByCompany(decodeURIComponent("Allied Universal")).subscribe((res)=>{
      // console.log(res);
      this.accounts=res
    })
  }

  checkComapny() {
    let demo = localStorage.getItem('user')
    if (demo !== null) {
      let demo2 = JSON.parse(demo);
      // console.log(demo2.user.id);
    }
  }

  updateUser(event: Event, field:any, id:any) {
    // Typecast the event target to HTMLInputElement to access the checked property safely
    const checked = (event.target as HTMLInputElement).checked;

    // console.log("Checkbox value changed:", checked);
    // console.log("field:", field);
    // console.log("id:", id);

    // build json with given parameters
    let json = { [field]: checked };
    // console.log(json);

    // send http PUT request to update user
    this.StrapiService.UpdateUser(id,json).subscribe((res)=>{
      // console.log(res);
      // console.log("updated succesfully");
      this.showSuccess('Successful change','Permition updated')
    },(err) => {
      // console.log("Unsuccessful change:", err);
      this.showError()
    })
  }

// MENUS
  menu_items:any;

  tableMenus() {
   this.menu_items = [
     {
       label: 'Edit',
       icon: 'pi pi-fw pi-user-edit'
     },
     {
         label: 'Delete',
         icon: 'pi pi-fw pi-trash'
     },
   ];
  }

  // Alerts
  showError() {
    this.messageService.add({key: 'ToastKey',severity:'error', summary: 'Error', detail: 'Something went wrong'});
  }

  showSuccess(summary:any, detail:any) {
    this.messageService.add({key: 'ToastKey',severity:'success', summary: summary, detail: detail});
  }
}
