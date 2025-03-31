import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { configs } from '../../environment/environment'

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private JWTBackentURL = configs.JWTBackentURL;
  constructor(private httpclient:HttpClient) { }

  login(username:string, password:string){
    const credentials = 
    { 
      username:username, 
      password:password 
    };
    const url = this.JWTBackentURL + 'api/Auth/login'
    return this.httpclient.post<any>(url, credentials);
  }
  Register(username:string, password:string, email:string, fullName:string)
  {
     const userDetails = 
     {
       username:username,
       password:password,
       email:email,
       fullName:fullName
     }
     const url = this.JWTBackentURL + 'api/Auth/register'
     return this.httpclient.post<string>(url, userDetails, { responseType: 'text' as 'json' });
  }
}
