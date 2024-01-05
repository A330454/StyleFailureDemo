import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StrapiService {

  private URL = "https://essential-vacation-6ff9a7193e.strapiapp.com/api/" // local strapi URL //
  private BaseURL = "https://essential-vacation-6ff9a7193e.strapiapp.com/" // local strapi URL //


  constructor(private http:HttpClient) { }

 //---------| Users |-------------------------------------------------------------------------------------------------------------------

  public LoginInAuth(form:any){
    return this.http.post(this.URL + "auth/local",form);
  }

  public signUp(form:any){
    const httppHeaders = new HttpHeaders({
      'content-type' : 'application/json',
      'Authorization': 'Bearer  '+ localStorage.getItem("jwt")
    });
    return this.http.post(this.URL + "users/",form, {headers: httppHeaders});
  }

  public sendConfirmEmail(form:any){
    return this.http.post(this.URL + "auth/send-email-confirmation",form);
  }

  public deleteUser(id:any){
    const httppHeaders = new HttpHeaders({
      'content-type' : 'application/json',
      'Authorization': 'Bearer  '+ localStorage.getItem("jwt")
    });
    return this.http.delete(this.URL + "users/"+ id, {headers: httppHeaders});
  }

  public getUser(id:any){
    const httppHeaders = new HttpHeaders({
      'content-type' : 'application/json',
      'Authorization': 'Bearer  '+ localStorage.getItem("jwt")
    });
    return this.http.get(this.URL + "users/"+ id+"?populate=*", {headers: httppHeaders});
  }

  public getStaffUsers(){
    const httppHeaders = new HttpHeaders({
      'content-type' : 'application/json',
      'Authorization': 'Bearer  '+ localStorage.getItem("jwt")
    });
    return this.http.get(this.URL + "users/?populate=*&filters[role][id][$eq]=3", {headers: httppHeaders});
  }

  public getCompanyUsers(companyId:any){
    const httppHeaders = new HttpHeaders({
      'content-type' : 'application/json',
      'Authorization': 'Bearer  '+ localStorage.getItem("jwt")
    });
    return this.http.get(this.URL + "users/?populate=*&filters[company][id][$eq]="+companyId, {headers: httppHeaders});
  }

  public getAdminUsersByCompany(company:any){
    const httppHeaders = new HttpHeaders({
      'content-type' : 'application/json',
      'Authorization': 'Bearer  '+ localStorage.getItem("jwt")
    });

     // Encode the company name
    const encodedCompany = encodeURIComponent(company);
    const url = `http://localhost:1337/api/users?populate[role][filters][name][$ne]=Student&populate[company][filters][name][$eq]=${encodedCompany}`;

    return this.http.get(url, {headers: httppHeaders});
  }

  public UpdateUser(id:any, form:any){
    const httppHeaders = new HttpHeaders({
      'content-type' : 'application/json',
      'Authorization': 'Bearer  '+ localStorage.getItem("jwt")
    });
    return this.http.put(this.URL + "users/"+id,form, {headers: httppHeaders});
  }

  public getUserByEmail(email:any){
    const httppHeaders = new HttpHeaders({
      'content-type' : 'application/json',
    });
    return this.http.get(this.URL + "users?filters[username][$eq]="+email, {headers: httppHeaders});
  }

  //---------| Grupos |-------------------------------------------------------------------------------------------------------------------

  public getGroups(){
    const httppHeaders = new HttpHeaders({
      'content-type' : 'application/json',
      'Authorization': 'Bearer  '+ localStorage.getItem("jwt")
    });
    return this.http.get(this.URL + "groups/?populate=*", {headers: httppHeaders});
  }

  //---------| Companies |-------------------------------------------------------------------------------------------------------------------

  public createCompany(from:any){
    const httppHeaders = new HttpHeaders({
      'content-type' : 'application/json',
      'Authorization': 'Bearer  '+ localStorage.getItem("jwt")
    });
    return this.http.post(this.URL + "companies/",from, {headers: httppHeaders});
  }

  public getCompany(id:any){
    const httppHeaders = new HttpHeaders({
      'content-type' : 'application/json',
      'Authorization': 'Bearer  '+ localStorage.getItem("jwt")
    });
    return this.http.get(this.URL + "companies/"+id+"?populate=*", {headers: httppHeaders});
  }

  public updateCompany(id:any, form:any){
    const httppHeaders = new HttpHeaders({
      'content-type' : 'application/json',
      'Authorization': 'Bearer  '+ localStorage.getItem("jwt")
    });
    return this.http.put(this.URL + "companies/"+id+"?populate=*", form ,{headers: httppHeaders});
  }

  public getCompanies(){
    const httppHeaders = new HttpHeaders({
      'content-type' : 'application/json',
      'Authorization': 'Bearer  '+ localStorage.getItem("jwt")
    });
    return this.http.get(this.URL + "companies/?populate=*", {headers: httppHeaders});
  }

  //---------| Students |-------------------------------------------------------------------------------------------------------------------

  public getStudents(){
    const httppHeaders = new HttpHeaders({
      'content-type' : 'application/json',
      'Authorization': 'Bearer  '+ localStorage.getItem("jwt")
    });
      return this.http.get(this.URL+'students/', {headers:httppHeaders});
  }

  //---------| Other |-------------------------------------------------------------------------------------------------------------------

   // Check if API is available
   async isApiAvailable(): Promise<boolean> {
    try {
      await this.http.get(`${this.BaseURL}`, { responseType: 'text' }).toPromise();  // Replace '/status' with an appropriate endpoint if needed
      return true;
    } catch (error: HttpErrorResponse | any) {
      return false;
    }
  }

  // file upload
  // uploadPhoto(file: File): Observable<any> {
  //   const formData: FormData = new FormData();
  //   formData.append('files', file, file.name);

  //   return this.http.post<any>('http://localhost:1337/api/upload', formData);
  // }
//---------| Reported Problems |---------------------------------------------------------------------------------------------------------------------

   public reportProblem(form:any){
    const httppHeaders = new HttpHeaders({
      'content-type' : 'application/json',
      'Authorization': 'Bearer  '+ localStorage.getItem("jwt")
    });
    return this.http.post(this.URL + "reported-problems/", form, {headers: httppHeaders});
  }

  public updateTicket(id:any, form:any){
    const httppHeaders = new HttpHeaders({
      'content-type' : 'application/json',
      'Authorization': 'Bearer  '+ localStorage.getItem("jwt")
    });
    return this.http.put(this.URL + "reported-problems/" + id,form, {headers: httppHeaders});
  }

  //---------| Emails |-----------------------------------------------------------------------------------------------------------------------------------

  // Send Code to forgoten email account
  public MailForgotPasswordCode(form:any){
    return this.http.post(this.URL + "auth/forgot-password", form);
  }

   // Send Code to forgoten email account
   public PasswordChange(form:any){
    return this.http.post(this.URL + "auth/reset-password/", form);
  }

  // invite to test
  public sendEmailTempalte(form:any){
    const httppHeaders = new HttpHeaders({
      'content-type' : 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("jwt")
    });
    return this.http.post(this.URL +"emails/sendEmailTemplate/", form, {headers: httppHeaders});
  }

  //---------| Reported Problems |--------------------------------------------------------------------------------------------------------------------

  public getReportedProblems(){
    const httppHeaders = new HttpHeaders({
      'content-type' : 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("jwt")
    });
    return this.http.get(this.URL +"reported-problems/", {headers: httppHeaders});
  }

}
