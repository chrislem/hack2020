import { Component, EventEmitter, OnInit, ViewChild,ViewEncapsulation } from '@angular/core';
import { ARCbasis, currencies, mapCurrencyARR, mapPeriodicity, periodicity, mapMaturity, ARRInterestMethods, mapInterestMethod } from '../../data/common';
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


export interface TableCFData {
  date: Date
  OPvalue: number
  PPvalue: number
  IPvalue: number
}

@Component({
  selector: 'ffdc-origination',
  templateUrl: './origination.component.html',
  styleUrls: ['./origination.component.scss'],
  encapsulation: ViewEncapsulation.None
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
  originDate: Date = this.today
  principal: number=10000
  ARRindex: string = 'SONIA'
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
  currencySymbol: string = '£'
  FTP: number = 0
  margin: number
  margin_status: string
  showStatus: boolean = false
  weatherImage: string

  //Data for graphs
  legendPosition = LegendPosition.verticalRightCenter;
  OPData = []
  IPData = []
  layoutInt: object
  layoutOP: object
  config: object
  style: object
  NPV: number = 0

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
  getCurrency() {
    this.currencySymbol = mapCurrencySymbol.get(this.currency);
    if(this.currency=="JPY"){this.currencyFactor=100};
    this.ARRindex = mapCurrencyARR.get(this.currency);
  }

  getFlag() {
    return mapFlag.get(this.currency)
  }

  

  //slider options
  opt_principal: Options = {
    floor: 10000,
    ceil: 1000000,
    step: 5000,
    showSelectionBar: true,
    translate: (value: number): string => {
      this.principal = value;
      return this.currencySymbol+this.principal;
    }
  }

  opt_ARR: Options = {
    showTicksValues: true,
    floor: 0,
    ceil: 5,
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
opt_spread: Options = {
  showSelectionBar: true,
  floor: this.FTP,
  ceil: 5,
  step: 0.05,
  translate: (value: number): string => {
    this.clientRateSpread = value
    return this.clientRateSpread+"%"
  }
};

  Compute() {
    
    this.arcInstance.computeContract(
      "ARRO"
      , this.currency //GBP
      , this.basis //'Act/Act'
      , this.amortizationType = mapAmotype.get(this.amortizationTypeLabel) //
      , this.periodicity // principalperiodicty
      , this.interestMethod //'RFRAVRSimple'
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
      this.NPV = Math.round(this.contract.npv*100)/100
      this.FTP=Math.round(this.contract.FTP*10000)/100
      console.log('Contract')
      console.log(contractreceived)
      this.drawBarchart()
      this.drawTable()
      this.computeMargin()
    })
  }
  drawBarchart() {
    console.log('ok drawbar')
 
    this.IPData = [
      {
        x: this.contract.cfInterest.getDates(),
        y: this.contract.cfInterest.getValues(),
        type: 'bar',
        name: 'Interests',
        marker: {color: '#040D14'}
      },
      {
        x: this.contract.fixing.getDates(),
        y: this.contract.fixing.getValues(),
        type: 'line',
        name: 'Fixings',
        yaxis: 'y2',
        line: {color: '#DD1C1A'}
      }]

    this.OPData = [
      {
        x: this.contract.cfOutstanding.getDates(),
        y: this.contract.cfOutstanding.getValues(),
        type: 'scatter',
        name: 'Outstanding',
        marker: {color: '#00C5C8'},
        fill: 'tonexty'
        
      }]
       
    this.layoutInt = {
      title: 'Interest',
      autosize: true,
      xaxis: {title: 'Date'},
      yaxis: {title: 'Amount'},
      yaxis2: {title: 'Rate (%)', overlaying: 'y', side: 'right'},
      plot_bgcolor:"#D0D1D3"
    }

    this.layoutOP = {
      title: 'Outstanding',
      autosize: true,
      xaxis: {title: 'Date'},
      yaxis: {title: 'Amount'},
      plot_bgcolor:"#D0D1D3"
    }
      this.config = {
      responsive: true
    }
    this.style = {
      width: '600px',
      height: '500px'
    }
    console.log(this.IPData)

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

    let j = 0
    let k = 0
    let l = 0
    let opval = 0

    for (let i = 0; i < ipdate.length; i++) {

      if (opdate[l].getTime() == ipdate[i].getTime()) {
        opval = opvals[l]
        l++
      }

      let ppval = 0
      if (ppdate[j].getTime() == ipdate[i].getTime()) {
        ppval = ppvals[j]
        j++
      }

      let ipval = 0
      if (ipdate[i].getTime() == ipdate[i].getTime())
        ipval = ipvals[i]

      /*let fixingval = 0
      if(fixingdate[k].getTime() == ipdate[i].getTime())
      {fixingval = fixingvals[k]
      k++}*/

      schedule.push(
        {
          date: this.datapipe.transform(ipdate[i], 'yyyy-MM-dd'),
          op: opval,
          pp: ppval,
          ip: ipval,
        }
      )

    }
    this.dataSource = new MatTableDataSource(schedule)
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort

  }
  computeMargin() {
    this.showStatus = true
    this.margin = Math.round((this.clientRateSpread - this.FTP)*100)/100
    if(this.margin>2) { this.weatherImage = "assets/Sunny.png"}
     else if (this.margin>1) {this.weatherImage = "assets/Cloudy-Sunny.png"}
      else if (this.margin>=0) {this.weatherImage = "assets/Cloudy.png"}
        else if (this.margin>-1) {this.weatherImage = "assets/Rainy.png"}
        else if (this.margin<=-1) {this.weatherImage = "assets/Lightning.png"}
  }
  
    //Events
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

