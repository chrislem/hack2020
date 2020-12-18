import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curve } from '../models/curve.model';
import { map } from 'rxjs/operators';
import { TimeSeries } from '../models/timeseries.model';
import { Contract } from '../models/contract.model';
import { environment } from '../../environments/environment';
import { IContract } from '../data/interface';
import { stockDeals } from '../data/common';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Basic ' + btoa('configadmin:configadmin'),
  
  })
};

function filterDeals(element:IContract)
{

}

@Injectable({
  providedIn: 'root'
})
export class ArcInstance {

  constructor(protected http: HttpClient) { }

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
    return this.http.post('http://'+environment.arcServer+'/services/ODRateARRValue', inputJSon, httpOptions).pipe(
      map(
        (jsonItem => {
          console.log(jsonItem)
          curveRes.addNewTimeSeries(jsonItem['result'][0]['Fixings'])
          return curveRes
        })
      )
    );
  }


  public computeContract(
    contractRef: string
    ,currency: string
    , basis: string
    , amortizationType: string
    , principalperiodicty: string
    , interestmethod: string
    , interestperiodicity: string
    , interestratetype: string
    , interestrateindex: string
    , origindate: Date
    , maturity: string
    , maturitydate: Date
    , principal: number
    , clientratespread: number
    , lookback: number
    , lockout: number
    , fixedrate: number
  ): Observable<Contract> {
    
    let contract = new Contract(
      contractRef
      ,currency
      , basis
      , amortizationType
      , principalperiodicty
      , interestmethod
      , interestperiodicity
      , interestratetype
      , interestrateindex
      , origindate
      , maturity
      , maturitydate
      , principal
      , clientratespread
      , lookback
      , lockout
      ,fixedrate
      ,principal    
    )
    let inputJSon = contract.getInputJson()
    console.log(inputJSon)
    return this.http.post('http://'+environment.arcServer+'/services/ODComputeDeal', inputJSon, httpOptions).pipe(
      map(
        (jsonItem => {
          console.log(jsonItem)
          contract.cfInterest = TimeSeries.fromJson(jsonItem['result'][0]['CFInterests'])
          contract.cfPrincipal = TimeSeries.fromJson(jsonItem['result'][0]['CFPrincipals'])
          contract.cfOutstanding = TimeSeries.fromJson(jsonItem['result'][0]['CFOutstandingPrincipals'])
          contract.cfDiscInterest = TimeSeries.fromJson(jsonItem['result'][0]['InterestDiscounts'])
          contract.cfDiscPrincipal = TimeSeries.fromJson(jsonItem['result'][0]['PrincipalDiscounts'])
          contract.fixing = TimeSeries.fromJson(jsonItem['result'][0]['Fixings'])
          contract.npv = jsonItem['result'][0]['NPV']
          contract.FTP = jsonItem['result'][0]['FTP']
          return contract
        })
      )
    );


  }




getDeals(
  contractType: string
)
{

  return stockDeals.filter(deal => deal.contractType === contractType)
 
}


  
}
