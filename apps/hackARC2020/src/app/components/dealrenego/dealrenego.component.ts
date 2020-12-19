
import { Component, EventEmitter, OnInit, ViewChild,ViewEncapsulation, Input } from '@angular/core';
import { ARCbasis, currencies, mapCurrencyARR, mapPeriodicity, periodicity, mapMaturity, ARRInterestMethods, mapInterestMethod, Customers, graphbg, barcolor, linecolor } from '../../data/common';
import { amortizationTypes, mapBasis, mapFlag, mapAmotype,mapCurrencySymbol } from '../../data/common';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe, getLocaleDateFormat } from '@angular/common';
import { ArcInstance } from '../../services/arcInstance.service';
import { LegendPosition, ChartType, ChartOrientation, TraceComponent } from '@ffdc/uxg-angular-components/chart';
import { Contract } from '../../models/contract.model';
import { scaleLog } from 'd3';
import { Options } from '@angular-slider/ngx-slider';
import { ceil } from 'lodash';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ppid } from 'process';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { ClientCardComponent } from '../client-card/client-card.component';
import { TimeSeries } from '../../models/timeseries.model';


export interface TableIntData {
  date: Date
  IPLibor: number
  IPARR: number

}

@Component({
  selector: 'arro-dealrenego',
  templateUrl: './dealrenego.component.html',
  styleUrls: ['./dealrenego.component.scss']
})
export class DealrenegoComponent implements OnInit {


//Form
ARRindex: string = 'SONIA'
ARRindexFlag
spreadlibor 
spreadliborarr 
vallibor 
valueARR 
breakEven 
breakEvenForm=0
margin

//running
runningARR: boolean
runningARRfull: boolean
switchTable: boolean = false

//Deals
@Input() originalDeal
dealARRhide: any
dealARR100per: any
dealARR: any

 //list
 basis_list = ARCbasis
 periodicity_list = periodicity
 currency_list = currencies
 ARRIntMethod_list = ARRInterestMethods
 amortType_list = amortizationTypes

 //variable
 periodicity: string
 currency: string = 'GBP'
 basis: string
 today = new Date()
 originDate: Date = this.today
 principal: number=10000

 maturity: string
 interestMethod: string = 'RFRAVRSimple'
 amortizationTypeLabel: string = 'Constant Capital'
 amortizationType: string = mapAmotype.get(this.amortizationTypeLabel)
 clientRateSpread: number = 0
 lookback: number = 0
 lockout: number = 0
 maxPeriodicity: number = 1
 minMaturity: number = 1
 contract: Contract
 flag: string
 currencyFactor: number = 1
 currencySymbol: string 
 FTP: number = 0

 margin_status: string
 showStatus: boolean = false
 weatherImage: string
 test: any
 
 //Data for graphs
 legendPosition = LegendPosition.verticalRightCenter;

 GraphData = []
 layoutInt: object
 config: object
 style: object
 NPV: number = 0

 //Data for table
 displayedColumns: string[] = ['date', 'IPLibor', 'IPARR'];
 TabledataSource: MatTableDataSource<TableIntData>;
 @ViewChild(MatPaginator) paginator: MatPaginator;
 @ViewChild(MatSort) sort: MatSort;


 //Clients
 currentclient: any;
 clients = []

 constructor(private arcInstance: ArcInstance,
   private datapipe: DatePipe
 ) {
 
  
 }



 ngOnInit(): void {
  this.ARRindex = mapCurrencyARR.get(this.originalDeal.currency)
  this.ARRindexFlag = mapFlag.get(this.originalDeal.currency)

  //console.log(this.originalDeal)
  this.addCurrentDealToGraph()
  //this.addCurrentDeatToTable()
  
  this.currencySymbol = mapCurrencySymbol.get(this.originalDeal.currency)
  this.spreadlibor = this.originalDeal.clientratespread
  this.vallibor = this.originalDeal.npv
  this.basis = this.originalDeal.basis
  this. _computeARRWithLiborCaracteristic()
 }

 //UI Event
 getCurrency() {
   this.currencySymbol = mapCurrencySymbol.get(this.currency);
   if(this.currency=="JPY"){this.currencyFactor=100};
   this.ARRindex = mapCurrencyARR.get(this.currency);
 }



 



 opt_ARR: Options = {
   showTicksValues: true,
   floor: 0,
   ceil: 5,
  };


opt_spread: Options = {
  //disabled: true,
 showSelectionBar: true,
 floor: this.FTP,
 ceil: 8,
 step: 0.01,
 translate: (value: number): string => {
   this.clientRateSpread = value
   return this.clientRateSpread+"%"
 }
};



 drawBarchart() {
   console.log('ok drawbar')

   this.layoutInt = {
     autosize: true,
     xaxis: {title: 'Date'},
     yaxis: {title: 'Amount'},
     yaxis2: {title: 'Rate (%)', overlaying: 'y', side: 'right'},
     plot_bgcolor: graphbg,
     margin: {
      b: 50,
      t: 20,
      pad: 10
    }
   }


     this.config = {
     responsive: true
   }
   this.style = {
     width: '780px',
     height: '550px'
   }


 }
 
 checkMargin() {
   this.showStatus = true
   //this.margin = Math.round((this.clientRateSpread - this.FTP)*100)/100
   if(this.margin>1) { this.weatherImage = "assets/Sunny.png"}
   else if (this.margin>0.5) {this.weatherImage = "assets/Cloudy-Sunny.png"}
   else if (this.margin>=-0.5) {this.weatherImage = "assets/Cloudy.png"}
   else if (this.margin<-0.5) {this.weatherImage = "assets/Rainy.png"}
   else if (this.margin<-1) {this.weatherImage = "assets/Lightning.png"}

  console.log(this.weatherImage)
 }
 
   //Events
 applyFilter(event: Event) {
   const filterValue = (event.target as HTMLInputElement).value;
   this.TabledataSource.filter = filterValue.trim().toLowerCase();

   if (this.TabledataSource.paginator) {
     this.TabledataSource.paginator.firstPage();
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

 ComputeARR() {
  console.log('ComputeARRfromForm')

  console.log(this.breakEvenForm)
  this.runningARR = true

  let interestrateindex = mapCurrencyARR.get(this.originalDeal.currency)
  this.arcInstance.computeContract(
    this.originalDeal.contractRef
    ,this.originalDeal.currency
    , this.basis
    , this.originalDeal.amortizationType
    , this.originalDeal.principalperiodicty
    , this.interestMethod
    , this.originalDeal.interestperiodicity
    , "Variable"
    , interestrateindex
    , this.originalDeal.origindate
    , undefined
    , this.originalDeal.maturitydate
    , this.originalDeal.balance
    , this.breakEvenForm
    , this.lookback
    , this.lockout
    , this.originalDeal.fixedrate
  ).subscribe(contractreceived => {
    console.log(contractreceived)
   this.dealARR = contractreceived
   this.valueARR = this.dealARR.npv
   //this.basis = this.originalDeal.basis

   this.margin = this.breakEvenForm - this.breakEven
   this.runningARR = false
   this.checkMargin()
   this.updateTable()
   this.updateGraphwithARR()

  })

 
}

ComputeARRFull() {
  console.log('ComputeARR')
  this._computeARRWithLiborCaracteristic()
}

 _computeARRWithLiborCaracteristic()
 {

  console.log(this.originalDeal)

  this.runningARR = true
  this.runningARRfull = true
  console.log('_computeARRWithLiborCaracteristic')
  let interestrateindex = mapCurrencyARR.get(this.originalDeal.currency)

  this.arcInstance.computeContract(
    this.originalDeal.contractRef
    ,this.originalDeal.currency
    , this.basis
    , this.originalDeal.amortizationType
    , this.originalDeal.principalperiodicty
    , this.interestMethod
    , this.originalDeal.interestperiodicity
    , "Variable"
    , interestrateindex
    , this.originalDeal.origindate
    , undefined
    , this.originalDeal.maturitydate
    , this.originalDeal.balance
    , this.originalDeal.clientratespread
    , this.lookback
    , this.lockout
    , this.originalDeal.fixedrate
  ).subscribe(contractreceived => {
    console.log(contractreceived)
   this.dealARRhide = contractreceived

   this._computeARR100Percent()

  })


 }

 _computeARR100Percent()
 {
  console.log('_computeARR100Percent')
  let interestrateindex = mapCurrencyARR.get(this.originalDeal.currency)

  this.arcInstance.computeContract(
    this.originalDeal.contractRef
    ,this.originalDeal.currency
    , this.originalDeal.basis
    , this.originalDeal.amortizationType
    , this.originalDeal.principalperiodicty
    , this.originalDeal.interestmethod
    , this.originalDeal.interestperiodicity
    , "Fixed"
    , interestrateindex
    , this.originalDeal.origindate
    , undefined
    , this.originalDeal.maturitydate
    , this.originalDeal.balance
    , this.originalDeal.clientratespread
    , 0
    , 0
    , 100.0
  ).subscribe(contractreceived => {
    console.log(contractreceived)
   this.dealARR100per = contractreceived

   this._computeARR()
  })
 }

 _computeARR()
 {
  console.log('_computeARR')


  
  let discnpv = 0
  let interest = this.dealARR100per.cfInterest.getValues()
  let discount = this.dealARR100per.cfDiscInterest.getValues()

  let count = interest.length

  for(let i=0; i < count; i++)
  {
    discnpv += interest[i]*discount[i]

  }

  this.spreadliborarr = ((this.originalDeal.npv - this.dealARRhide.npv)/discnpv)*100

  this.breakEven = this.spreadlibor + this.spreadliborarr 
  this.breakEvenForm = this.breakEven

  this.runningARR = true
  this.runningARRfull = false

  let interestrateindex = mapCurrencyARR.get(this.originalDeal.currency)

  this.arcInstance.computeContract(
    this.originalDeal.contractRef
    ,this.originalDeal.currency
    , this.originalDeal.basis
    , this.originalDeal.amortizationType
    , this.originalDeal.principalperiodicty
    , this.originalDeal.interestmethod
    , this.originalDeal.interestperiodicity
    , "Variable"
    , interestrateindex
    , this.originalDeal.origindate
    , undefined
    , this.originalDeal.maturitydate
    , this.originalDeal.balance
    , this.breakEvenForm 
    , 0
    , 0
    , this.originalDeal.fixedrate
  ).subscribe(contractreceived => {
    console.log(contractreceived)
   this.dealARR = contractreceived
   this.valueARR = this.dealARR.npv

   this.margin = this.breakEvenForm - this.breakEven
   this.runningARR = false
  this.checkMargin()
  this.updateTable()
  this.updateGraphwithARR()
  })

 }

 addCurrentDealToGraph()
 {
  this.drawBarchart()
  console.log(this.originalDeal)
 this.GraphData = [
    {
      x: this.originalDeal.cfInterest.getDates(),
      y: this.originalDeal.cfInterest.getValues(),
      type: 'bar',
      name: 'Interest Libor',
 
      marker: {size: 200, color: barcolor[0]}
    },
    {
      x: this.originalDeal.fixing.getDates(),
      y: this.originalDeal.fixing.getValues(),
      type: 'line',
      name: 'Fixing Libor',
      yaxis: 'y2',
      line: {width: 3, color: linecolor[0]}
    }]
 }

 updateGraphwithARR()
 {
   if(this.GraphData.length > 2)
    this.GraphData.splice(2, 2)

    this.GraphData.push(
      {
        x: this.dealARR.cfInterest.getDates(),
        y: this.dealARR.cfInterest.getValues(),
        type: 'bar',
        name: 'Interest ARR',
        marker: {color: barcolor[1]}
      }) 
      
      this.GraphData.push( {
        x: this.dealARR.fixing.getDates(),
        y: this.dealARR.fixing.getValues(),
        type: 'line',
        name: 'Fixing ARR',
        yaxis: 'y2',
        line: {color: linecolor[1]}
      })

 }



 updateTable()
 {

  let data = []
  let dates = this.originalDeal.cfInterest.getDates()
  let iLibor = this.originalDeal.cfInterest.getValues()
  let iARR = this.dealARR.cfInterest.getValues()

  let count = dates.length

  for(let i=0; i < count; i++)
  {
    data.push(
      {
        date: this.datapipe.transform(dates[i], 'yyyy-MM-dd'),
        IPLibor: iLibor[i],
        IPARR: iARR[i]
      })
  }


this.TabledataSource = new MatTableDataSource(data)
this.TabledataSource.paginator = this.paginator
this.TabledataSource.sort = this.sort


 }

}
