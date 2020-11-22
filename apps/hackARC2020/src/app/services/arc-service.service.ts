import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Basic ' + btoa('configadmin:configadmin'),
  
  })
};

@Injectable({
  providedIn: 'root'
})
export class ArcServiceService {

  constructor(private httpClient: HttpClient) { }


  getCurveData(currency: string, basis: string, mode: string)
  {
    
  }



  private sendPostRequest(data: any): Observable<any> {
    return this.httpClient.post<any>('http://localhost:32412/services/RateARRCurve', JSON.stringify(data),httpOptions);
  }
  
}
