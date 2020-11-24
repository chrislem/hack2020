import { Component, EventEmitter, OnInit } from '@angular/core';
import { basis, currencies, mapCurrencyARR, mapPeriodicity, periodicity, mapMaturity, ARRInterestMethods,mapInterestMethod } from '../../data/common';
import { amortizationTypes } from '../../data/common';
@Component({
  selector: 'ffdc-origination',
  templateUrl: './origination.component.html',
  styleUrls: ['./origination.component.scss']
})
export class OriginationComponent implements OnInit {

//list
basis_list = basis
periodicity_list = periodicity
currency_list = currencies
ARRIntMethod_list = ARRInterestMethods
amortType_list = amortizationTypes

//variable
periodicity: string
currency: string
basis: string
originDate: Date
principal: number
ARRindex: string
maturity: string
interestMethod: string
amortizationType: string
clientRateSpread: number
lookback: number
lockout: number

  constructor() { 
    this.ARRindex
}

  ngOnInit(): void {

  }

//UI Event
maturityLabel(value: number) {
  return mapMaturity.get(value.toString());
}

setMaturity(event){
  return this.maturity = mapMaturity.get(event.toString());
  console.log(this.periodicity);  
}

periodicityLabel(value: number) {
    return mapPeriodicity.get(value.toString());
}

setPeriodicity(event){
  return this.periodicity = mapPeriodicity.get(event.toString());
  console.log(this.periodicity);
  }

setARRIndex(event: Event) {
return this.ARRindex = mapCurrencyARR.get(this.currency); 
}


}
