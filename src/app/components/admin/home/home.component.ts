import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StrapiService } from 'src/app/services/Backend/strapi.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DriverEvalService } from 'src/app/services/DriverEval/driver-eval.service';
import { Table } from 'primeng/table'; // Import Table from PrimeNG
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class HomeComponent {
  @ViewChild('dt') dt!: Table; // Access the PrimeNG table using ViewChild

  public SearchForm = new FormGroup({
    param: new FormControl()
  });

  public postForm = new FormGroup({
    lastName: new FormControl(),
    firstName: new FormControl(),
    image:new FormControl(),
    email:new FormControl(),
    username:new FormControl(),
  });

  public companyInformationForm = new FormGroup({
    name: new FormControl(),
    country: new FormControl(),
    city: new FormControl(),
    phone: new FormControl(),
    main_user: new FormControl(),
    email: new FormControl(),
    url: new FormControl(),
    tokensAvailable:new FormControl(),
    usedTokens:new FormControl(),
    // billing info
    RFC:new FormControl(),
    direccion1:new FormControl(),
    direccion2:new FormControl(),
    codigoPostal:new FormControl(),
    billingEmail:new FormControl(null,[Validators.email]),
  });

  public inviteClientForm = new FormGroup({
    username: new FormControl(),
    email: new FormControl(),
    confirmed: new FormControl(true),
    blocked: new FormControl(false),
    firstName: new FormControl(),
    lastName: new FormControl(),
    password: new FormControl('contrasenagenerica123!'),
    passwordConfirm: new FormControl('contrasenagenerica123!'),
    role: new FormControl(1),
    mngCompany: new FormControl(false),
    mngUsers: new FormControl(false),
    mngGroups: new FormControl(true),
    mngCourses: new FormControl(true),
    mngBilling: new FormControl(true),
    clientuuid: new FormControl(),
    company: new FormControl(),
    tokenUsagePermission: new FormControl(true),
    createUsersPermission: new FormControl(true),
    assignTestsPermission: new FormControl(true),
    language: new FormControl(),
  });

  constructor(
    private strapiService:StrapiService,
    public translate:TranslateService,
    private DriverEvalService:DriverEvalService,
    private router:Router,
    private StrapiService:StrapiService,
    private messageService: MessageService
    ) {
      this.SearchForm.get('param')?.valueChanges.subscribe((value) => {
        // console.log('Input value changed:', value);
        this.dt.filterGlobal(value, 'contains');
        // Additional actions or logging based on the new value can be performed here.
      });
    }

    userName:any;

    ngOnInit(): void {  
    this.getClients(); 
    this.checkUserInfo();
    this.defineMenuItems();
    this.defineLanguageDropdown();
    this.initChart();
  }

  checkUserInfo(){
    let localstorageUser = localStorage.getItem('UserInformation');

    if (localstorageUser) {
      let jsonUser = JSON.parse(localstorageUser);
      // console.log(jsonUser);
      this.userName=jsonUser.firstName + ' ' + jsonUser.lastName;
       
    }else{
      // console.log('no hay info');
      
    }
  }

  clients:any;

  getClients(){
    this.strapiService.getCompanies().subscribe((data:any)=>{
      this.clients = data.data;
      // console.log(this.clients);
    },(error:any)=>{
      console.log(error);
    })
  }

  clientUUID:any;
  client:any;

  selectClient(client:any){
    this.client = client;
    this.clientUUID = client.attributes.uuidDriverEval;
    // console.log(this.client);
    
  }

  items:any;

    // Group Options dropdowns
    defineMenuItems() {
      this.items = [{
        label: 'Opciones',
        items: [
          {
            label: 'Entrar a Interfaz',
            icon: 'pi pi-external-link',
              command: () => {
                this.enterClientsUI(this.clientUUID, this.client.id);                
              }
          },
          {
            label: 'Ver Perfil',
            icon: 'pi pi-building',
              command: () => {
               this.showCompanyInformationModal()
              }
            
          }]}];
    }

    emailJson:any;

    inviteClient() {
      this.inviteClientForm.patchValue({
        username: this.inviteClientForm.value.email
      });

      this.strapiService.signUp(this.inviteClientForm.value).subscribe((data:any)=>{
      
        // prapare raw json to email password recovery 
        let json = {
          email:this.inviteClientForm.value.email
        }
        // console.log(json);
        
        this.strapiService.MailForgotPasswordCode(json).subscribe((data:any)=>{
          
          // reste form values
          this.inviteClientForm.patchValue({
            username:null,
            email:null,
            firstName:null,
          })
          this.showSuccess('¡Éxito!','El cliente ha sido invitado')
          this.addUserModal=false;
        })

      },(err)=>{
            console.log(err);
            this.showError('La cuenta no pudo ser creada','Verifique la información')
          })
        }

    // modal

    addUserModal=false;

    // Country Dropdown Menu
   countries = [
    { name: 'Español' },
    { name: 'Ingles'}
  ];

  companyInfoResponse:any;

  enterClientsUI(clientUuid:any, clientId:any) {
    this.strapiService.getCompany(clientId).subscribe((res)=>{
      // console.log(res);
      this.companyInfoResponse = res;
      let localStorageUser = localStorage.getItem('UserInformation');
      if (localStorageUser) {
        let json = JSON.parse(localStorageUser);
      
        json.clientuuid=this.clientUUID;
        json.company=this.companyInfoResponse.data;
      
        localStorage.setItem('UserInformation',JSON.stringify(json));
      
        this.DriverEvalService.getClientByUUID(json.clientuuid).subscribe((res)=>{
          let company: any = res; 
          
          company.clientId = clientId
        
          localStorage.setItem('CompanyInformation',JSON.stringify(company))
          
          this.router.navigate(['/','manage-online-tests'])
        })
       }else{      
       }
       })    
  }

  // Company Information Modal

  companyInformationModal=false;

  showCompanyInformationModal(){
    // console.log(this.client);
    
    this.companyInformationModal=true;
    this.companyInformationForm.patchValue({
      name: this.client.attributes.name,
      country: this.client.attributes.country,
      city: this.client.attributes.city,
      phone: this.client.attributes.phone,
      main_user: this.client.attributes.main_user,
      email: this.client.attributes.email,
      tokensAvailable:this.client.attributes.tokens,
      usedTokens:this.client.attributes.usedTokens,
      // billing info
      RFC:this.client.attributes.RFC,
      direccion1:this.client.attributes.direccion1,
      direccion2:this.client.attributes.direccion2,
      codigoPostal:this.client.attributes.codigoPostal,
      billingEmail:this.client.attributes.billingEmail,
    })
  }

  postCompanyChanges() {
    if (this.companyInformationForm.value.name && this.companyInformationForm.value.country && this.companyInformationForm.value.phone && this.companyInformationForm.value.city) {
      // console.log("Company id: "+ this.companyInformationLocalStorage.id);
      
      let data = {data:this.companyInformationForm.value}

      this.StrapiService.updateCompany(this.client.id,data).subscribe((res)=>{
        // console.log(res);
        // update local storage user info CompanyInformation Variable
        let LocalStoragestring = localStorage.getItem('UserInformation')
        if (LocalStoragestring) {
          const storedData = JSON.parse(LocalStoragestring);
          storedData.company.name = this.postForm.value.lastName;
          storedData.company.phone = this.postForm.value.firstName;
          storedData.company.country = this.postForm.value.username;
          storedData.company.city = this.postForm.value.email;

          localStorage.setItem('UserInformation', JSON.stringify(storedData));
        }

        let LocalStoragestringUser = localStorage.getItem('UserInformation')
        if (LocalStoragestringUser) {
          const storedData = JSON.parse(LocalStoragestringUser);
          // console.log("stored data before changes");
          
          // console.log(storedData);
          
          storedData.company.name = this.companyInformationForm.value.name;
          storedData.company.phone = this.companyInformationForm.value.phone;
          storedData.company.country = this.companyInformationForm.value.country;
          storedData.company.city = this.companyInformationForm.value.city;
          storedData.company.RFC = this.companyInformationForm.value.RFC;
          storedData.company.direccion1 = this.companyInformationForm.value.direccion1;
          storedData.company.direccion2 = this.companyInformationForm.value.direccion2;
          storedData.company.codigoPostal = this.companyInformationForm.value.codigoPostal;
          storedData.company.billingEmail = this.companyInformationForm.value.billingEmail;

          // console.log("stored data after changes");
          
          // console.log(storedData);

          localStorage.setItem('UserInformation', JSON.stringify(storedData));
        }
        // success alert
        this.showSuccess(this.translate.instant('edit-profile-ALERTS-SUCCESS'), this.translate.instant('edit-profile-UNDO-SUCCESS-DESCRIPTION'))
    },(err) => {
      // show error on api request
      // console.log(err);
      this.showError(this.translate.instant('edit-profile-ALERTS-MISSING-INFO'),this.translate.instant('edit-profile-ALERTS-MISSING-INFO-DESCRIPTION'))
    })
    }else{
      // show user error
      this.showError(this.translate.instant('edit-profile-ALERTS-MISSING-INFO'),this.translate.instant('edit-profile-ALERTS-MISSING-INFO-DESCRIPTION'))}
  }

  //----| Alerts |---------------------------------------------------------------------------------------------------------------------------------------------------------------
  showError(summary:any, detail:any) {
    this.messageService.add({severity:'error', summary: summary, detail: detail});
  }

  showSuccess(summary:any, detail:any) {
    this.messageService.add({severity:'success', summary: summary, detail: detail});
  }

  showInfo(summary:any, detail:any) {
    this.messageService.add({severity: 'info', summary: summary, detail: detail });
  }

  showWarn(summary:any, detail:any) {
    this.messageService.add({severity: 'warn', summary: summary, detail: detail });
  }
  // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  languages:any;

  defineLanguageDropdown() {
    this.languages = [
      { name: 'Español', code: 'es' },
      { name: 'Ingles', code: 'en' }
  ];
  }

  // chatrs
  chartOptions:any;
  chartData:any;

  initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.chartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                tension: .4
            },
            {
                label: 'Second Dataset',
                data: [28, 48, 40, 19, 86, 27, 90],
                fill: false,
                backgroundColor: documentStyle.getPropertyValue('--green-600'),
                borderColor: documentStyle.getPropertyValue('--green-600'),
                tension: .4
            }
        ]
    };

    this.chartOptions = {
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };
  }

  

}
