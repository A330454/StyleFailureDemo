import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SharedVariableService } from 'src/app/services/generic/shared-variable.service';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  cities: City[] | undefined;

  selectedCity: City | undefined;

  user_menu:any;
  language_menu:any;

  items:any;

  constructor(private router:Router,
    public translate:TranslateService,
    public SharedVariableService: SharedVariableService) {}

  ngOnInit() {
    // console.log(this.translate.currentLang);
    
    this.defineItems()
    this.defineUserItems()

    this.translate.onLangChange.subscribe((event)=>{
      this.defineItems()
      this.defineUserItems()
    })
   
    

    this.language_menu =[
      {
      label: 'ESPAÑOL',
      icon: 'pi pi-fw pi-language',
      command: () => this.switchLang('es')
      },
      {
        label: 'ENGLISH',
        icon: 'pi pi-fw pi-language',
        command: () => this.switchLang('en')
        },];
  }

  async switchLang(lang:string) {
    localStorage.setItem('currentLang',lang)
    await this.translate.use(lang)
    this.defineItems()
  }

  goTo(path:any){
    this.router.navigate(['/',path])
  }

  // menu Items
  defineItems() {
    this.items = [
      // {
      //     label: this.translate.instant('navbar-component-onlineTests'),
      //     icon: 'pi pi-fw pi-desktop',
      //     command: () => this.goTo('manage-online-tests'),
      //     StylePropertyMap: 'font-family: Poppins, sans-serif; font-weight: bold;',
      // }
  ];
  }

  defineUserItems() { 
    if (this.translate.currentLang == 'es') {
      this.user_menu = [
        {
          label: 'Perfil',
          icon: 'pi pi-fw pi-user',
          command: () => this.SharedVariableService.settingsOverlayProfile = true
  
      },
      {
        label: 'Empresa',
        icon: 'pi pi-fw pi-building',
        command: () => this.SharedVariableService.settingsOverlayCompany = true
      },
      {
        label: 'Cerrar Sesión',
        icon: 'pi pi-fw pi-sign-out',
        command: () => this.router.navigate(['/','login'])
      }
      ];
    }else{
      this.user_menu = [
        {
          label: 'Profile',
          icon: 'pi pi-fw pi-user',
          command: () => this.SharedVariableService.settingsOverlayProfile = true
  
      },
      {
        label: 'Company Info',
        icon: 'pi pi-fw pi-building',
        command: () => this.SharedVariableService.settingsOverlayCompany = true
      },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-sign-out',
        command: () => this.router.navigate(['/','login'])
      }
      ];
    }
    
   }

}
