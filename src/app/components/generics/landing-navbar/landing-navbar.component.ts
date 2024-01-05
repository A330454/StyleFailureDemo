import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-landing-navbar',
  templateUrl: './landing-navbar.component.html',
  styleUrls: ['./landing-navbar.component.scss']
})
export class LandingNavbarComponent {

  navbarItems: any;

  constructor(
    public translate:TranslateService,
    public router:Router
    ) {}

  ngOnInit() {
    this.defineNavbarItems()

    // On Language Change
    this.translate.onLangChange.subscribe((event)=>{
      this.defineNavbarItems()
    })
  }

  goTo(param:any) {
    this.router.navigate(['/',param])
  }

  async switchLang(lang:string) {
    await this.translate.use(lang)
    this.defineNavbarItems()
  }

  defineNavbarItems() {
    this.navbarItems = [
      {
          label: 'HOME',
          icon: 'pi pi-fw pi-home',
          command: () => this.goTo('home'),
          StylePropertyMap: 'font-family: Poppins, sans-serif; font-weight: bold;',
      },
      {
        label: 'PRICING',
        icon: 'pi pi-fw pi-money-bill',
        command: () => this.goTo('pricing'),
        StylePropertyMap: 'font-family: Poppins, sans-serif; font-weight: bold;',
      },
      {
        label: this.translate.instant('navbar-component-languages'),
        icon: 'pi pi-fw pi pi-globe',
        items: [
            {
                label: 'ESPAÑOL',
                icon: 'pi pi-fw pi-language',
                command: () => this.switchLang('es')
            },
            {
                label: 'ENGLISH',
                icon: 'pi pi-fw pi-language',
                command: () => this.switchLang('en')
            }
        ]
      }
  ];
  }

}
