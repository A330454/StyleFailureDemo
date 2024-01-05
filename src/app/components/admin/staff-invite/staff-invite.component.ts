import { Component,ViewChild } from '@angular/core';
import { StrapiService } from 'src/app/services/Backend/strapi.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { LOCALE_ID } from '@angular/core';


@Component({
  selector: 'app-staff-invite',
  templateUrl: './staff-invite.component.html',
  styleUrls: ['./staff-invite.component.scss'],
  providers: [ConfirmationService, MessageService, DatePipe, { provide: LOCALE_ID, useValue: 'es' }]
})
export class StaffInviteComponent {
  @ViewChild('dt') dt!: Table; // Access the PrimeNG table using ViewChild

  public profileForm = new FormGroup({
    lastName: new FormControl(),
    firstName: new FormControl(),
    company: new FormControl(),
    role: new FormControl(),
    email: new FormControl(),
    password:new FormControl(),
    createdAt:new FormControl(),
    dateJoined:new FormControl(),
    image:new FormControl(),
  });

  public InviteStaffForm = new FormGroup({
    email: new FormControl( null, [Validators.required, Validators.email] ),
    lastName: new FormControl(),
    firstName: new FormControl(),
    createUsersPermission: new FormControl(true),
    assignTestsPermission: new FormControl(true),
    tokenUsagePermission: new FormControl(true),
    role: new FormControl(3),
    blocked: new FormControl(false),
    confirmed: new FormControl(true),
    username: new FormControl(),
    password: new FormControl('changeMe1!'),
  });

  public SearchForm = new FormGroup({
    param: new FormControl()
  });

  inviteStaffModal=false;

  constructor(
    private strapiService: StrapiService,
    private messageService: MessageService,
    private datePipe: DatePipe,
    ) {
    this.SearchForm.get('param')?.valueChanges.subscribe((value) => {
      // console.log('Input value changed:', value);
      this.dt.filterGlobal(value, 'contains');
      // Additional actions or logging based on the new value can be performed here.
    });
  }

  ngOnInit(): void {
    this.defineMenuItems();
    this.getAs3Staff();
  }

  as3StaffList:any;

  getAs3Staff(){
    this.strapiService.getStaffUsers().subscribe((data:any)=>{
      // console.log(data);
      this.as3StaffList = data;
    },(error:any)=>{
      console.log(error);
    }	
  )};

  inviteStaffMember() {
    this.InviteStaffForm.patchValue({
      username: this.InviteStaffForm.value.email,
    });
    this.strapiService.signUp(this.InviteStaffForm.value).subscribe((data: any) => {
      
      let json = {
        email: this.InviteStaffForm.value.email
      }

      this.strapiService.MailForgotPasswordCode(json).subscribe((data: any) => {
        this.showSuccess('Éxito','Nuevo miembro del staff invitado');
        this.InviteStaffForm.patchValue({
          firstName: null,
          lastName: null,
          email: null
        });
        this.getAs3Staff();
        this.inviteStaffModal=false;
      })      
    }, (error: any) => {
      console.log(error);
      this.showError('Error',error.error.error.message);
    });
  }
  
  deleteStaffMemberDialog=false;

  selectedStaffMember={
    firstName: 'Not selected',
    lastName: 'Not Selected',
    id:0,
    dateJoined:'',
    createdAt:'',
    email:'',
    role:{id:0,name:''},
    company:''
  }

  selectStaffMember(staffMember:any) {
    this.selectedStaffMember=staffMember
    // console.log(this.selectedStaffMember);
  }

  JsonUser:any;

  deleteStaffMember() {
    let localStorageUser = localStorage.getItem('UserInformation');
    if (localStorageUser) {
      this.JsonUser = JSON.parse(localStorageUser);
    }

    if (this.selectedStaffMember.id == this.JsonUser.id) {
      this.showError('Error','No puedes eliminar tu propio usuario');
    }else{
      console.log(this.selectedStaffMember.id);
      
      this.strapiService.deleteUser(this.selectedStaffMember.id).subscribe((data: any) => {
        this.showSuccess('Éxito','Miembro del staff eliminado');
        this.deleteStaffMemberDialog=false;
        this.getAs3Staff();
      }, (error: any) => {
        this.showError('Error','No se pudo eliminar el miembro del staff');
        console.log(error);
      });
    }
  }

  //------| Alerts |----------------------------------------------------------------------------------------------------------------------------------------------------------------

  showError(summary:any,detail:any) {
    this.messageService.add({severity:'error', summary: summary, detail: detail});
  }

  showSuccess(summary:any,detail:any) {
    this.messageService.add({severity:'success', summary: summary, detail: detail});
  }
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  items:any;

   // Group Options dropdowns
   defineMenuItems() {
    this.items = [{
      label: 'Opciones',
      items: [
        {
          label: 'Perfil',
          icon: 'pi pi-user',
          command: () => {
            this.openProfileDialog();
          }
        },
        {
          label: 'Eliminar',
          icon: 'pi pi-times',
          command: () => {
            this.deleteStaffMemberDialog=true;
          }
        }]}];
  }

  profileDialog=false;

  openProfileDialog() {
    
    console.log(this.selectedStaffMember);

    // date format
    // Formatear la fecha
  let formattedDate = this.datePipe.transform(this.selectedStaffMember.createdAt, 'HH:mm MMM d, yyyy');

  // Cambiar la primera letra del mes a mayúscula
  if (formattedDate) {
    formattedDate = formattedDate.replace(/(\b[a-z](?!\s))/g, function(x) { return x.toUpperCase(); });
  }
    
    this.profileForm.patchValue({
      firstName: this.selectedStaffMember.lastName,
      lastName: this.selectedStaffMember.firstName,
      role: this.selectedStaffMember.role.name,
      email: this.selectedStaffMember.email,
      createdAt:this.selectedStaffMember.createdAt,
      dateJoined:formattedDate,
      company:'AS3 International',
    });

    // once it finish, open the dialog
    this.profileDialog=true;
  }

}
