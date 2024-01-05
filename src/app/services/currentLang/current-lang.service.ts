import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentLangService {

  constructor(private translate: TranslateService) {    
      if (this.translate.currentLang==undefined || this.translate.currentLang==null) {
        let lang = localStorage.getItem('currentLang')
        
        if (lang) {
          this.translate.use(lang)
        }
      }else{
      }
  }
}
