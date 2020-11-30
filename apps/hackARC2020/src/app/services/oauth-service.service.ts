import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class OAuthServiceService {

  private accessToken: string;
  private expires_in: number
  private hasValidToken: boolean = false

  constructor( public http: HttpClient) { }

  getAccessToken() {
    
    

    if(this.hasValidToken)
      return this.accessToken

    let params = new URLSearchParams();
    
    params.append('grant_type','client_credentials');
    params.append('client_id', environment.oauthClientID);
    params.append('client_secret', environment.oauthClientSecret);
    params.append('scope',environment.oauthScope);

    let headers = 
    new HttpHeaders(
    );

    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'application/json');
  


console.log(params.toString())

     

    this.http.post(environment.oauthTokenURI, params.toString(),     {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    })
    .subscribe(
      data => {
        this.accessToken = data['access_token']
        console.log(this.accessToken)
        this.hasValidToken = true
        return this.accessToken
      }
      ,
      err => console.log('Invalid Credentials')); 
       
        
  }

  /**
   * Check validity of token, exist, expire, etc.
   */
  hasValidAccessToken() {
    return this.hasValidToken
  }
  

}
