import { Component, EventEmitter, OnInit,ViewChild } from '@angular/core';
import { ARCbasis, currencies, mapCurrencyARR, mapPeriodicity, periodicity, mapMaturity, ARRInterestMethods,mapInterestMethod } from '../../data/common';
import { amortizationTypes,mapBasis,mapFlag,mapAmotype } from '../../data/common';
import {MatTableDataSource} from '@angular/material/table';
import { DatePipe, getLocaleDateFormat } from '@angular/common';
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
periodicity: string 
currency: string = 'GBP'
basis: string = 'Exact/365'
today = new Date()
originDate: Date
principal: number = 100000
ARRindex: string = 'SONIA'
maturity: string 
interestMethod: string = 'RFRAVRSimple'
amortizationTypeLabel: string = 'Bullet'
amortizationType: string = mapAmotype.get(this.amortizationTypeLabel)
clientRateSpread: number = 0
lookback: number = 0
lockout: number = 0
maxPeriodicity: number =1
minMaturity: number = 1
contract: Contract
flag: string 

//Switch between form and card
showForm: boolean = true
showCard: boolean = false
showGraph: boolean = false

//Data for graphs
legendPosition = LegendPosition.verticalRightCenter;
IPtrace = []
OPtrace = []
Fixingtrace = []
traces = []
NPV: number
showOP: boolean = false

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
//maturityLabel(value: number) {
  //return mapMaturity.get(value.toString());
//}

//setMaturity(event){
//  this.maturitySlider = event;
//return this.maturity = mapMaturity.get(event.toString());

//}

//periodicityLabel(value: number) {
 //   return mapPeriodicity.get(value.toString());
//}

//setPeriodicity(event){
 // return this.periodicity = mapPeriodicity.get(event.toString());

 // }

setARRIndex(event: Event) {
return this.ARRindex = mapCurrencyARR.get(this.currency); 
}

interestMethodLabel(value: string) {
  return mapInterestMethod.get(value);
}

basisLabel(value: string) {
  return mapBasis.get(value);
}

getFlag() {
return mapFlag.get(this.currency)
}

//slider
value: number =0;

//slider options
opt_ARR: Options = {
  showTicksValues: true,
    floor: 0,
    ceil: 5
};
opt_maturity: Options = {
  showSelectionBar: true,
    floor: 1,
    ceil: 15,
    translate: (value: number): string => {
       return this.maturity = mapMaturity.get(value)
    }   
};
opt_periodicity: Options = {
  
  showSelectionBar: true,
    floor: 1,
    ceil: 4,
    translate: (value: number): string => {
      return this.periodicity = mapPeriodicity.get(value)
      }  
 
};

openCompute() {
  this.showForm = true
  this.showCard = false
}

Compute(){
  this.showForm = false
  this.showCard = true
  this.showGraph = true

  this.arcInstance.computeContract(
    "ARRO"
    , this.currency //EUR
    , this.basis //'Act/Act'
    , this.amortizationType = mapAmotype.get(this.amortizationTypeLabel) //
    , this.periodicity // principalperiodicty
    , this.interestMethod //'Simple'
    , this.periodicity//InterestPeriodicity
    , 'Variable' //'Fixed'
    , this.ARRindex
    , this.originDate//OriginDate
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
      if (this.amortizationType != "Bullet") {this.showOP=true}
      console.log(this.showOP)
        
        this.IPtrace = [
         {
          dimension: this.contract.cfInterest.getDates(),
          dimensionName: 'Dates',
          measure: this.contract.cfInterest.getValues(),
          measureName: 'Interest',
          type: ChartType.bar,
          orientation: 'horizontal'
           }]

         this.OPtrace = [
         {
          dimension: this.contract.cfOutstanding.getDates(),
          dimensionName: 'Dates',
          measure: this.contract.cfOutstanding.getValues(),
          measureName: 'Capital',
          type: ChartType.bar,
          orientation: 'horizontal'
         }]

         this.Fixingtrace = [
         {
          dimension: this.contract.fixing.getDates(),
          dimensionName: 'Dates',
          measure: this.contract.fixing.getValues(),
          measureName: 'Fixing',
          type: ChartType.line,
          orientation: 'horizontal'   
         }]

         this.traces = this.IPtrace.concat(this.Fixingtrace)
         console.log(this.traces)
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

