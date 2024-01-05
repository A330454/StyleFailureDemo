import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedVariableService {

  sharedVariable: string | null = null;

  groupUUID:any;

  sideBarSelection:any;

  groupName:any;

  userInformation:any;
  
  loginInfo:any

  companyInfo:any

  settingsOverlayProfile=false;
  settingsOverlayCompany=false;

  constructor() {
    if (this.sharedVariable === null || this.sideBarSelection === undefined) {
      this.sharedVariable = 'allGroups';
      localStorage.setItem('GroupsNavigation','allGroups')
    }
  }

  goBack() {
    if (this.sharedVariable=='testTakerPage') {
      this.sharedVariable='allGroups'
    }if (this.sharedVariable=='testResults') {
      this.sharedVariable='testTakerPage' 
    }
  }

  goBackLocalStorage() {
    if (localStorage.getItem('GroupsNavigation')=='testTakerPage') {
      localStorage.setItem('GroupsNavigation','allGroups')
    }if (localStorage.getItem('GroupsNavigation')=='testResults') { 
      localStorage.setItem('GroupsNavigation','testTakerPage')
    }
  }

}
