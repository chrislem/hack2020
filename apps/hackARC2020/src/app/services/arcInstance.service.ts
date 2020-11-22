import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { curvemock } from '../data/mockdata';
import { CurveData } from '../data/interface';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Basic ' + btoa('configadmin:configadmin'),
  
  })
};

@Injectable({
  providedIn: 'root'
})
export class ArcInstance {

  constructor() { }


  getCurveData(currency: string, basis: string, periodicity: string, curve: string, curvemethod: string)
  {
    console.log(currency);
    console.log(basis);
    console.log(periodicity);
    console.log(curve);
    console.log(curvemethod);

    let retcurvedata = new CurveData()

    let idcurve = ''
    idcurve += currency+basis+periodicity+curve+(curve == 'standard'?curvemethod:'')
    console.log('id:'+idcurve)
    let curvedata = curvemock[idcurve]
    console.log('curve'+curvedata)
    if (curvedata == null ||  curvedata == undefined) 
    {
      console.log('cant find curve')
      curvedata = curvemock['default']
    }
      

    retcurvedata.currency = currency
    retcurvedata.basis = basis
    retcurvedata.periodicity = periodicity
    retcurvedata.curve = curve
    retcurvedata.curvemethod = curvemethod
    retcurvedata.dates = curvedata.dimension
    retcurvedata.values = curvedata.measure

     return retcurvedata
  }



  // private sendPostRequest(data: any): Observable<any> {
  //   return this.httpClient.post<any>('http://localhost:32412/services/RateARRCurve', JSON.stringify(data),httpOptions);
  // }
  
}
