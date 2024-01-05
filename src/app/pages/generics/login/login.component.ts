import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

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
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    public translate: TranslateService,
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
}
