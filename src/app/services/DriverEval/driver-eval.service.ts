import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DriverEvalService {
  private URL = "https://api.driverseval.com/api/" // local strapi URL //
  private BaseURL = "https://api.driverseval.com/" // local strapi URL //
  private token = "d982806ef239b8350fa797e782ca1bf6d5b4fdd966266772670e433d58e9f5e42f926754eebce62bf00ee5a3634aa0bbb568511a4698b1268152459b15c3ebe18e70c196ed6ac929546c2498c5f778dd8f37e1da7f12d845596ef28be176468603febc6703a0dc9aeb7c68aeabd238d2463754430d2a2964c4984f7269fd349b"

  constructor(private http:HttpClient) { }

  // Client

  public createClient(form:any){
    const httppHeaders = new HttpHeaders({
      'content-type' : 'application/json',
      'Authorization': 'Bearer  '+ this.token
    });
    return this.http.post(this.URL + "clients/", form, {headers: httppHeaders});
  }

  public getClientByID(id:any){
    const httppHeaders = new HttpHeaders({
      'content-type' : 'application/json',
      'Authorization': 'Bearer  '+ this.token
    });
    return this.http.get(this.URL + "client/"+id+"/?populate=*", {headers: httppHeaders});
  }

  public getClientByUUID(uuid:any){
    const httppHeaders = new HttpHeaders({
      'content-type' : 'application/json',
      'Authorization': 'Bearer  '+ this.token
    });
    return this.http.get(this.URL + "client/"+uuid+"/?populate=*", {headers: httppHeaders});
  }

  public updateClient(clientId:any,data:any){
    const httppHeaders = new HttpHeaders({
      'content-type' : 'application/json',
      'Authorization': 'Bearer  '+ this.token
    });
    return this.http.put(this.URL + "clients/"+clientId+"?populate=*&pagination[pageSize]=9999",data, {headers: httppHeaders});
  }

  // Tests

  public getTestsByClient(ClientUUID:any){
    const httppHeaders = new HttpHeaders({
      'content-type' : 'application/json',
      'Authorization': 'Bearer  '+ this.token
    });
    return this.http.get(this.URL + "find_tests_for_client/"+ClientUUID+"/?populate=*", {headers: httppHeaders});
  }

  public getTakersByClientWithPagination(ClientUUID:any){
    const httppHeaders = new HttpHeaders({
      'content-type' : 'application/json',
      'Authorization': 'Bearer  '+ this.token
    });
    return this.http.get(this.URL + "tests?filters[uuid[$Eq]="+ClientUUID+"&fields=driver_birthdate&fields=uuid&fields=started&fields=ended&fields=driver_name&pagination[pageSize]=9999", {headers: httppHeaders});
  }

  public getTests(uuid:any){
    const httppHeaders = new HttpHeaders({
      'content-type' : 'application/json',
      'Authorization': 'Bearer  '+ this.token
    });
    return this.http.get(this.URL + "clients/"+uuid+"/?populate=*", {headers: httppHeaders});
  }

  public getTestsByUUID(uuid:any){
    const httppHeaders = new HttpHeaders({
      'content-type' : 'applic5ation/json',
      'Authorization': 'Bearer  '+ this.token
    });
    return this.http.get(this.URL + "clients/"+uuid+"/?populate=*", {headers: httppHeaders});
  }

  public getTestsByID(id:any){
    const httppHeaders = new HttpHeaders({
      'content-type' : 'application/json',
      'Authorization': 'Bearer  '+ this.token
    });
    return this.http.get(this.URL + "clients/"+id+"/?populate=*", {headers: httppHeaders});
  }

  public createTestForGroup(num:any, groupUUID:any){
    const httppHeaders = new HttpHeaders({
      'content-type' : 'application/json',
      'Authorization': 'Bearer  '+ this.token
    });
    return this.http.get(this.URL + "create_tests_for_group/"+groupUUID+"?num="+num, {headers: httppHeaders});
  }

  public getTestForGroup(GroupUUID:any){
    const httppHeaders = new HttpHeaders({
      'content-type' : 'application/json',
      'Authorization': 'Bearer  '+ this.token
    });
    return this.http.get(this.URL + "get_test_for_group/"+GroupUUID, {headers: httppHeaders});
  }

  public getTakersByGroupID(groupId:any){
    const httppHeaders = new HttpHeaders({
      'content-type' : 'application/json',
      'Authorization': 'Bearer  '+ this.token
    });
    return this.http.get(this.URL + "tests?filters[group][id][$eq]="+groupId+"&populate=*&pagination[pageSize]=9999", {headers: httppHeaders});
  }

  public deleteTest(id:any){
    const httppHeaders = new HttpHeaders({
      'content-type' : 'application/json',
      'Authorization': 'Bearer  '+ this.token
    });
    return this.http.delete(this.URL + "tests/"+id, {headers: httppHeaders});
  }

  // Groups

  public getGroups(){
    const httppHeaders = new HttpHeaders({
      'content-type' : 'application/json',
      'Authorization': 'Bearer  '+ this.token
    });
    return this.http.get(this.URL + "groups/", {headers: httppHeaders});
  }

  public getGroupByUUID(groupUUID:any){
    const httppHeaders = new HttpHeaders({
      'content-type' : 'application/json',
      'Authorization': 'Bearer  '+ this.token
    });
    return this.http.get(this.URL + "group/"+groupUUID+"?populate=*", {headers: httppHeaders});
  }

  public groupByClientId(clientId:any){
    const httppHeaders = new HttpHeaders({
      'content-type' : 'application/json',
      'Authorization': 'Bearer  '+ this.token
    });
    return this.http.get(this.URL + "groups?filters[client][id][$eq]="+clientId+"&populate=*&pagination[pageSize]=9999", {headers: httppHeaders});
  }

  public getGroupsByID(id:any){
    const httppHeaders = new HttpHeaders({
      'content-type' : 'application/json',
      'Authorization': 'Bearer  '+ this.token
    });
    return this.http.get(this.URL + "clients/"+id+"?populate=*&pagination[pageSize]=9999", {headers: httppHeaders});
  }

  public createGroup(form:any){
    const httppHeaders = new HttpHeaders({
      'content-type' : 'application/json',
      'Authorization': 'Bearer  '+ this.token
    });
    return this.http.post(this.URL + "groups/",form, {headers: httppHeaders});
  }

  public deleteGroup(id:any){
    const httppHeaders = new HttpHeaders({
      'content-type' : 'application/json',
      'Authorization': 'Bearer  '+ this.token
    });
    return this.http.delete(this.URL + "groups/"+id, {headers: httppHeaders});
  }

  public updateGroup(id:any, form:any){
    const httppHeaders = new HttpHeaders({
      'content-type' : 'application/json',
      'Authorization': 'Bearer  '+ this.token
    });
    return this.http.put(this.URL + "groups/"+id, form, {headers: httppHeaders});
  }

  // Check if API is available
  async isApiAvailable(): Promise<boolean> {
    try {
      await this.http.get(`${this.BaseURL}`, { responseType: 'text' }).toPromise();  // Replace '/status' with an appropriate endpoint if needed
      return true;
    } catch (error: HttpErrorResponse | any) {
      return false;
    }
  }

}
