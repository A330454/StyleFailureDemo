import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormGroup, FormControl } from '@angular/forms';
import { StrapiService } from 'src/app/services/Backend/strapi.service';
import { TranslateService } from '@ngx-translate/core';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-manage-branding',
  templateUrl: './manage-branding.component.html',
  styleUrls: ['./manage-branding.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ManageBrandingComponent {

  public companyInformation = new FormGroup({
    name: new FormControl(),
    country: new FormControl(),
    city: new FormControl(),
    phone: new FormControl(),
    main_user: new FormControl(),
    email: new FormControl(),
    url: new FormControl(),
  });

  constructor( private confirmationService: ConfirmationService,
               private messageService: MessageService,
               private service:StrapiService,
               public translate: TranslateService
               ) {}
               
  UILoaded=false

  ngOnInit(): void {
    this.getCompanyInfo()
  }


  // Dropdown Menus
  countries = [
    { name: 'United States', code: 'US' },
    { name: 'Mexico', code: 'MX' }
  ];

  // File Upload
  onUpload(event: UploadEvent) {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
  }

  // Alerts
  SuccessAlert() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Changes Where Saved' });
  }

  ErrorAlert() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Message Content' });
  }

  CancelAlert() {
    this.messageService.add({ severity: 'info', summary: 'Canceled', detail: 'Changes Where Reverted' });
  }

  // Bottons

  loading: boolean = false;

  load() {
    this.loading = true;
    this.loading = false
    this.SuccessAlert()

  }

  undoChanges() {
    // console.log("undo");
    this.getCompanyInfo()
  }

  confirm(event: Event) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Are you sure that you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
        }
    });
  }

  // Dialogs
  dialogVisible=false

  ShowLogoDialog() {
    this.dialogVisible=true
  }

  localstorage:any;
  userInfo:any;
  response:any;

  // Form info
  getCompanyInfo() {
    this.localstorage = localStorage.getItem('user')
    let json  = JSON.parse(this.localstorage);
    this.service.getUser(json.user.id).subscribe((res)=>{
      this.userInfo=res
      // console.log(this.userInfo.company.id);
      this.service.getCompany(this.userInfo.company.id).subscribe((res)=>{
        this.response = res
        // console.log(this.response.data.attributes.users_permissions_user.data.attributes.username);
        this.companyInformation.patchValue({
          name: this.response.data.attributes.name,
          country: this.response.data.attributes.country,
          phone: this.response.data.attributes.phone,
          main_user: this.response.data.attributes.users_permissions_user.data.attributes.username,
          email: this.response.data.attributes.email,
          url: null,
          city: this.response.data.attributes.city
        });

        this.UILoaded=true
      })
    })
  }

  // reset button
  resetform() {
    this.getCompanyInfo()
    this.CancelAlert()
  }

}
