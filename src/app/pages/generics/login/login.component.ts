import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { StrapiService } from 'src/app/services/Backend/strapi.service';
import { TranslateService } from '@ngx-translate/core';
import { SharedVariableService } from 'src/app/services/generic/shared-variable.service';
import { DriverEvalService } from 'src/app/services/DriverEval/driver-eval.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class LoginComponent {

  blockedUI: boolean = false;

  public loginForm = new FormGroup({
    identifier: new FormControl(null,[Validators.required, Validators.email]),
    password: new FormControl(null)
  });

  constructor(
    private router:Router,
    private StrapiService: StrapiService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    public translate: TranslateService,
    private SharedVariableService:SharedVariableService,
    private DriverEvalService: DriverEvalService
    ){}

    currentLang:any
    cities:any;

  ngOnInit(): void {
    this.primengConfig.ripple=true;

    localStorage.clear()

    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
  ];
    }

    

  // login backend conection

    userInfo:any;
    user:any;

    async login(form:any){
      this.currentLang = this.translate.currentLang;
      // console.log(form.value);
      this.blockedUI=true
      if (this.loginForm.value.password != null && this.loginForm.value.identifier != null) {
        if (this.loginForm.valid) {

          this.StrapiService.LoginInAuth(form.value).subscribe((res)=>{
            this.userInfo=res
            localStorage.setItem("user", JSON.stringify(this.userInfo))
            this.SharedVariableService.userInformation=JSON.stringify(this.userInfo)
            // console.log(this.userInfo);

            // save Json Web Token & user info
            localStorage.setItem("jwt",this.userInfo.jwt)

            this.StrapiService.getUser(this.userInfo.user.id).subscribe((res)=>{
              this.userInfo=res
              // console.log(this.userInfo);
              
              // save variables
              localStorage.setItem('UserInformation', JSON.stringify(this.userInfo));
              localStorage.setItem('SideBarSelection','exams')
              localStorage.setItem('currentLang','es')

              this.SharedVariableService.loginInfo = this.loginForm.value

              // save user information
              // console.log(this.userInfo);

              // check if is staff
              if (this.userInfo.role.id == 3) {
                // console.log('is staff');
                localStorage.setItem('admin-page', 'home');
                this.router.navigate(['/','admin-dashboard'])
              }
               // check if a company is linked to the account

              //  TODO: ADD if role id is not 3 to this else if 
               else if (this.userInfo.company == undefined || this.userInfo.company == null ) {
                // if there is not company linked go to create company

                // console.log('no company linked');
                
                this.router.navigate(['/','create-company'])

                this.blockedUI=false
              }else{
                // if there is company linked go to manage-online-tests

                // console.log('company linked');
                // console.log(this.userInfo);
                
                // console.log(this.userInfo.clientuuid);
                

                this.DriverEvalService.getClientByUUID(this.userInfo.clientuuid).subscribe((res)=>{
                  let company: any = res; 
                  company.clientId = this.userInfo.company.id

                  // console.log(this.userInfo.company.id);
                  
                  // console.log(res);
                  localStorage.setItem('CompanyInformation',JSON.stringify(company))
                  
                  this.router.navigate(['/','manage-online-tests'])

                  this.blockedUI=false
                },(err) => {
                  this.showError(this.translate.instant('login-component-ALERT-ERROR'),this.translate.instant('login-component-ALERT-ERROR-DESCRIPTION'))
                  this.blockedUI=false
                })
              }
             
            })
          },(err) => {
            // incorrect credencials
            // console.log("Error al validar el inicio de sesión:", err);
            this.blockedUI=false
            if (this.currentLang=='en') {
              this.showError('Login Error','Incorrect credencials')
            }else{
              this.showError('Inicio de Sesión','Credenciales Incorrectas')
            }
          })
        }else {
          // Not a valid email format
          if (this.currentLang=='en') {
            this.showError('Login Error','Incorrect email format')
          }else{
            this.showError('Inicio de Sesión','Formato de correo inválido')
          }
          this.blockedUI=false
        }{}
      }else{
        // User or password are null
        if (this.currentLang=='en') {
          this.showError('Login Error','Please write email and password')
        }else{
          this.showError('Inicio de Sesión','Escriba su correo y contraseña')
        }
        this.blockedUI=false
      }
    }

    // Alert
    showError(summary:any,detail:any) {
      this.messageService.add({key: 'myKey1',severity:'error', summary: summary, detail: detail});
    }

    // Navigation

    navigateTo(input:any) {
      this.router.navigate(['/',input])
    }

    showResponse(response:any) {
      //call to a backend to verify against recaptcha with private key
  }
}
