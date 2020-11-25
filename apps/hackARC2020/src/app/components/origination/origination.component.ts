import { Component, EventEmitter, OnInit } from '@angular/core';
import { ARCbasis, currencies, mapCurrencyARR, mapPeriodicity, periodicity, mapMaturity, ARRInterestMethods,mapInterestMethod } from '../../data/common';
import { amortizationTypes,mapBasis } from '../../data/common';
@Component({
  selector: 'ffdc-origination',
  templateUrl: './origination.component.html',
  styleUrls: ['./origination.component.scss']
})
export class OriginationComponent implements OnInit {

//list
basis_list = ARCbasis
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
maturitySlider: number

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
  this.maturitySlider = event;
  return this.maturity = mapMaturity.get(event.toString());

}

periodicityLabel(value: number) {
    return mapPeriodicity.get(value.toString());
}

setPeriodicity(event){
  return this.periodicity = mapPeriodicity.get(event.toString());

  }

setARRIndex(event: Event) {
return this.ARRindex = mapCurrencyARR.get(this.currency); 
}

interestMethodLabel(value: string) {
  return mapInterestMethod.get(value);
}

testMaturity(){
console.log(this.maturitySlider);
if (this.maturitySlider < 4)
{return this.maturitySlider}
else
{return 4}
}

basisLabel(value: string) {
  return mapBasis.get(value);
}

testCompute(){
  console.log("click!")
}

}

