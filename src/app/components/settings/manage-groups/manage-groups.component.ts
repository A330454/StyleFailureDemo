import { Component } from '@angular/core';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { FormGroup, FormControl } from '@angular/forms';
import { DriverEvalService } from 'src/app/services/DriverEval/driver-eval.service';
@Component({
  selector: 'app-manage-groups',
  templateUrl: './manage-groups.component.html',
  styleUrls: ['./manage-groups.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ManageGroupsComponent {

  constructor( private confirmationService: ConfirmationService,
               private messageService: MessageService,
               private driverEvalService: DriverEvalService
    ) {}

  ngOnInit(): void {
    this.getGroups()
    this.tableMenus()
  }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// GROUPS

  groups:any;

  getGroups() {
    this.groups=[
      { "name":"California", "image":"./assets/img/group_image.png","username":"email@mail.com","date":"Oct 30, 2022","participants":"12"},
      { "name":"Denver", "image":"./assets/img/group_image.png","username":"email@mail.com","date":"Oct 30, 2022","participants":"20"},
      { "name":"Texas", "image":"./assets/img/group_image.png","username":"email@mail.com","date":"Oct 30, 2022","participants":"31"},
    ];
  }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
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
}
