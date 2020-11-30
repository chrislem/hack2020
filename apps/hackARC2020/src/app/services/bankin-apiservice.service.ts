import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { OAuthServiceService } from './oauth-service.service';

@Injectable({
  providedIn: 'root'
})
export class BankinAPIServiceService {

  constructor(public http: HttpClient, private oauthService: OAuthServiceService) { }

  test()
  {
    
    let token = this.oauthService.getAccessToken()
    
    this.http.get(environment.bankingBaseURI+'/personal-customers/024340', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer '+token)
    })
    .subscribe(
      data => {
        
        console.log(data)
      }
      ,
      err => console.log('Invalid Credentials')); 
       
        
  }


}
