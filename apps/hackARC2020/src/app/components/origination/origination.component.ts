import { Component, EventEmitter, OnInit,ViewChild } from '@angular/core';
import { ARCbasis, currencies, mapCurrencyARR, mapPeriodicity, periodicity, mapMaturity, ARRInterestMethods,mapInterestMethod } from '../../data/common';
import { amortizationTypes,mapBasis } from '../../data/common';
import {MatTableDataSource} from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { ArcInstance } from '../../services/arcInstance.service';
import { LegendPosition, ChartType, ChartOrientation, TraceComponent } from '@ffdc/uxg-angular-components/chart';
import { Contract } from '../../models/contract.model';
import { scaleLog } from 'd3';
import { Options } from '@angular-slider/ngx-slider';
import { ceil } from 'lodash';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { ppid } from 'process';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';


export interface TableCFData {
  date: Date
  OPvalue: number
  PPvalue: number
  IPvalue: number
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
IPtrace = []
OPtrace = []
Fixingtrace = []
mergetrace = []
NPV: number

//Data for table
displayedColumns: string[] = ['date', 'op', 'pp', 'ip'];
dataSource: MatTableDataSource<TableCFData>;
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

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
//slider
value: number =0;

options: Options = {
  showTicksValues: true,
    floor: 0,
    ceil: 5
};


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
  ).subscribe(contractreceived => {
    this.contract = contractreceived
    this.NPV = this.contract.npv
    console.log('Contract')
    console.log(contractreceived)
    this.drawBarchart()
    this.drawTable()
    })
  
  }
    drawBarchart() {
      console.log('ok drawbar')
      console.log(this.contract)
        this.IPtrace = [
         {
          dimension: this.contract.cfInterest.getDates(),
          dimensionName: 'Dates',
          measure: this.contract.cfInterest.getValues(),
          measureName: 'IP',
          type: ChartType.bar,
          orientation: 'horizontal' 
         }]

         this.OPtrace = [
         {
          dimension: this.contract.cfOutstanding.getDates(),
          dimensionName: 'Dates',
          measure: this.contract.cfOutstanding.getValues(),
          measureName: 'OP',
          type: ChartType.bar,
          orientation: 'horizontal'
         }]

         this.Fixingtrace = [
         {
          dimension: this.contract.fixing.getDates(),
          dimensionName: 'Dates',
          measure: this.contract.fixing.getValues(),
          measureName: 'Fixing',
          type: ChartType.scatter,
          orientation: 'horizontal'
         }]
    }
    drawTable() {
      console.log('ok table')

      let opdate = this.contract.cfOutstanding.getDates()
      let ppdate = this.contract.cfPrincipal.getDates()
      let ipdate = this.contract.cfInterest.getDates()
      let fixingdate = this.contract.fixing.getDates()

      let opvals = this.contract.cfOutstanding.getValues()
      let ppvals = this.contract.cfPrincipal.getValues()
      let ipvals = this.contract.cfInterest.getValues()
      let fixingvals = this.contract.fixing.getValues()
 
      let schedule = []

      let j =0
      let k = 0
      let l =0
      let opval = 0

      for (let i = 0; i< ipdate.length;i++)
      {
            
      if(opdate[l].getTime()==ipdate[i].getTime())
      {opval = opvals[l]
      l++}  

      let ppval = 0
      if(ppdate[j].getTime()==ipdate[i].getTime())
      {ppval = ppvals[j]
      j++}

      let ipval = 0
      if(ipdate[i].getTime()==ipdate[i].getTime())
      ipval = ipvals[i]
      
      /*let fixingval = 0
      if(fixingdate[k].getTime() == ipdate[i].getTime())
      {fixingval = fixingvals[k]
      k++}*/

      schedule.push(
      {
      date : this.datapipe.transform(ipdate[i], 'yyyy-MM-dd'),
      op: opval,
      pp: ppval,
      ip: ipval,
      }
      )

      }
  
                
      this.dataSource = new MatTableDataSource(schedule) 
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
      
      console.log(this.dataSource)
    
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    onClick(event: Array<object>) {
      console.log('simple click: ', event);
    }
  
    onSelected(event: Array<object>) {
      console.log('simple click list items selected: ', event);
    }
  
    onDoubleClick(event: Array<object>) {
      console.log('double click: ', event);
    } 
}

