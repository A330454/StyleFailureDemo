import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { StrapiService } from 'src/app/services/Backend/strapi.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class EditProfileComponent {

  public profileForm = new FormGroup({
    lastName: new FormControl(null,[Validators.required]),
    firstName: new FormControl(null,[Validators.required]),
    company: new FormControl(),
    role: new FormControl(),
    email: new FormControl(),
    password:new FormControl(),
    createdAt:new FormControl(),
    dateJoined:new FormControl(),
    image:new FormControl(),
  });

  public postForm = new FormGroup({
    lastName: new FormControl(),
    firstName: new FormControl(),
    image:new FormControl(),
    email:new FormControl(),
    username:new FormControl(),
  });

  constructor(
    private router: Router,
    private StrapiService: StrapiService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.checkUser()
    }

    // User

    postChanges() {
      this.postForm.patchValue({
        lastName: this.profileForm.value.lastName,
        firstName: this.profileForm.value.firstName,
        image: this.profileForm.value.image,
        username: this.profileForm.value.email,
        email: this.profileForm.value.email,
      })

      if (this.postForm.value.firstName && this.postForm.value.lastName) {
        // console.log(this.postForm.value);
        this.StrapiService.UpdateUser(this.user.user.id, this.postForm.value).subscribe((res)=>{
        this.showSuccess('Success', 'Your profile was updated')
      })
      }else{
        this.showWarn('Missing Information','Name and Lastname are required')}
    }

    userInfo:any;
    user:any;

  checkUser() {
    this.userInfo = localStorage.getItem('user');
    this.user =JSON.parse(this.userInfo)
    // console.log(this.user);
    this.getUser()
  }

  navigateToChangePassword() {
    this.router.navigate(['/','password-reset'])
  }

  getUser() {
    // console.log(this.user.user.id);
    
    // get from API user info based on id
    this.StrapiService.getUser(this.user.user.id).subscribe((res=>{
      this.userInfo=res
      // console.log(this.userInfo);

      // console.log("http://localhost:1337/"+this.userInfo.image.url);

      // this.profile_img="http://localhost:1337/uploads/"+this.userInfo.image.name
      this.profileForm.patchValue({
        lastName: this.userInfo.lastName,
        firstName: this.userInfo.firstName,
        company: this.userInfo.company.name,
        role: this.userInfo.role.name,
        email: this.userInfo.email,
        password:this.userInfo.password,
        dateJoined:this.formatDate(this.userInfo.createdAt)
      })

      if (this.userInfo.image) {
        this.profileForm.patchValue({
          image:"http://localhost:1337"+this.userInfo.image.url
        })
      }

    }))
    }

  // Form

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  }

  resetForm() {
    this.profileForm.patchValue({
      lastName: this.userInfo.lastName,
      firstName: this.userInfo.firstName,
      company: this.userInfo.company.name,
      role: this.userInfo.role.name,
      email: this.userInfo.email,
      password:this.userInfo.password,
      dateJoined:this.formatDate(this.userInfo.createdAt)
    })
    this.showInfo('Information','Changes where reverted')
  }

  // Alerts
  showError(summary:any, detail:any) {
    this.messageService.add({key: 'ToastKey', severity:'error', summary: summary, detail: detail});
  }

  showSuccess(summary:any, detail:any) {
    this.messageService.add({key: 'ToastKey', severity:'success', summary: summary, detail: detail});
  }

  showInfo(summary:any, detail:any) {
    this.messageService.add({key: 'ToastKey', severity: 'info', summary: summary, detail: detail });
  }

  showWarn(summary:any, detail:any) {
    this.messageService.add({key: 'ToastKey', severity: 'warn', summary: summary, detail: detail });
  }

  // dialog
  dialogVisible=false

  ShowLogoDialog() {
    this.dialogVisible=true
  }

}
