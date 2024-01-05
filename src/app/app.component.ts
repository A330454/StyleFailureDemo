import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AS3-Portal';

  constructor(
    translate:TranslateService,) {
    translate.addLangs(['en','es'])
    // default language config
    translate.setDefaultLang('es');
  }
}
