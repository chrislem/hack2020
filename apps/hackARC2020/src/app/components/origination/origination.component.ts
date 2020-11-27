import { Component, EventEmitter, OnInit } from '@angular/core';
import { ARCbasis, currencies, mapCurrencyARR, mapPeriodicity, periodicity, mapMaturity, ARRInterestMethods,mapInterestMethod } from '../../data/common';
import { amortizationTypes,mapBasis } from '../../data/common';
import {MatTableDataSource} from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { ArcInstance } from '../../services/arcInstance.service';
import { LegendPosition, ChartType, ChartOrientation, TraceComponent } from '@ffdc/uxg-angular-components/chart';
import { Contract } from '../../models/contract.model';


export interface TableCFData {
  contractref: string;
  date: string
  value: number
}

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
periodicity: string = '1m'
currency: string
basis: string
originDate: Date
principal: number
ARRindex: string
maturity: string = '1m'
interestMethod: string
amortizationType: string
clientRateSpread: number
lookback: number
lockout: number
maturitySlider: number
contract: Contract

//Data for graphs
legendPosition = LegendPosition.verticalRightCenter;
IPtrace 

NPV: number

  constructor(private arcInstance: ArcInstance,
    private datapipe: DatePipe
    ) { 
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

if (this.maturitySlider < 4)
{return this.maturitySlider}
else
{return 4}
}

basisLabel(value: string) {
  return mapBasis.get(value);
}

testCompute(){
  this.arcInstance.computeContract(
    "ARRO"
    , this.currency //EUR
    , this.basis //'Act/Act'
    , this.amortizationType //'Bullet'
    , this.periodicity // principalperiodicty
    , this.interestMethod //'Simple'
    , this.periodicity//InterestPeriodicity
    , 'Variable' //'Fixed'
    , this.ARRindex
    , new  Date ("2020-12-15")//OriginDate
    , this.maturity//'1m'
    , this.principal //1000
    , this.clientRateSpread//0.30
    , this.lookback //1
    , this.lockout //2
    , null //FixedRate
  ).subscribe(contract => {
    this.contract = contract
    console.log('Contract')
    console.log(contract)
    this.drawBarchart()
    })
  
  }
    drawBarchart() {
      console.log('ok drawbar')
        this.IPtrace =
         {
          dimension: this.contract.cfInterest.getDates(),
          dimensionName: 'Dates',
          measure: this.contract.cfInterest.getValues(),
          measureName: 'IP',
          type: ChartType.bar,
          orientation: 'horizontal' 
         }
      
    }
}

