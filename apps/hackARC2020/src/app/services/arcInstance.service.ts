import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { curvemock } from '../data/mockdata';
import { CurveData } from '../data/interface';
import { Curve } from '../models/curve.model';
import { map } from 'rxjs/operators';
import { TimeSeries } from '../models/timeseries.model';
import { Contract } from '../models/contract.model';
import { DatePipe } from '@angular/common';


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

  constructor(protected http: HttpClient) { }

/*
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
  }*/


  public getCurve(
    currency: string
    , basis: string
    , periodicity: string
    , curve: string
    , curvemethod: string
  ): Observable<Curve> {
console.log('getCurve')

    let curveRes = new Curve(currency,basis, periodicity,curve,curvemethod)
    let inputJSon = curveRes.getInputJson()
    console.log(inputJSon)
    return this.http.post('http://192.168.43.241:13350/services/ODRateARRValue', inputJSon, httpOptions).pipe(
      map(
        (jsonItem => {
          console.log(jsonItem)
          curveRes.addNewTimeSeries(jsonItem['result'][0]['Fixings'])
          return curveRes
        })
      )
    );
  }

  public test(): Observable<TimeSeries>{

   let timeSeries: TimeSeries
    let contract: Contract
    console.log('test')
    // return this.http.get('http://localhost:3000/ODRateARRValue').subscribe
    //     (jsonItem => 
    //       {
    //         return TimeSeries.fromJson(jsonItem['result'][0]['Fixings'])
    //       }
    // )

   return null
  }
  


  // private sendPostRequest(data: any): Observable<any> {
  //   return this.httpClient.post<any>('http://localhost:32412/services/RateARRCurve', JSON.stringify(data),httpOptions);
  // }
  
}
