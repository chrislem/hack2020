import { Component, OnInit,  ViewChild} from '@angular/core';
import { LegendPosition, ChartType, ChartOrientation } from '@ffdc/uxg-angular-components/chart';

import { basis, currencies, periodicity } from '../../data/common';
import { ArcInstance } from '../../services/arcInstance.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Curve } from '../../models/curve.model';
import { DatePipe } from '@angular/common';

export const COLUMNS = [
  { displayName: 'Curve List', name: 'curves' },
  { displayName: 'Curve Name', name: 'curvename' },
  { displayName: 'Description', name: 'description' }
];

export interface TableCurevData {
  currency: string;
  basis: string;
  periodicity: string;
  curvetype: string;
  curvemethod?:string;
  date: string
  value: string
}

@Component({
  selector: 'ffdc-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss']
})
export class RateComponent implements OnInit {
  legendPosition = LegendPosition.verticalRightCenter;

  //Data form
  currencies = currencies
  basislist = basis
  periodicities = periodicity

  //form elements
  currency: any
  basis: any
  periodicity: any
  curve= "arr"
  curvemethod= undefined
  isCurveValid = false
 
  // curve data
  curvedata: { [id: string]: Curve; } = {}
  curvekey= []
  traces = []

  curvetest : Curve
//Tab group
tabInit = 0

loadcurve = false

//table
displayedColumns: string[] = ['currency', 'basis', 'periodicity', 'curvetype', 'curvemethod', 'date', 'value'];
dataSource: MatTableDataSource<TableCurevData>;

@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

  constructor(private arcInstance: ArcInstance,
    private datapipe: DatePipe) {
      this.loadcurve = false
   }

  ngOnInit(): void {

    }

  ngAfterViewInit() {
  // this.dataSource.paginator = this.paginator;
  // this.dataSource.sort = this.sort;
  }

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

//Action
  addCurve() {

    let curve: Curve

    // console.log(this.currency);
    // console.log(this.basis);
    // console.log(this.periodicity);
    // console.log(this.curve);
    // console.log(this.curvemethod);
    // console.log(this.arcInstance)

    this.loadcurve = true
    this.isCurveValid = false

    this.arcInstance.getCurve(
      this.currency,
      this.basis,
      this.periodicity,
      this.curve,
      this.curvemethod  
    ).subscribe(curve => {

      console.log(curve)

      if(this.curvedata[curve.getCurveID()] == undefined)
      {
        this.curvedata[curve.getCurveID()] = curve
        this.drawGraph()
        this.updateTableCurve()
        this.tabInit = 0;
        this.loadcurve = false
        this.isCurveValid = true
      }}
    )

    
  }

  updateTableCurve()
  {
    var data: Array<TableCurevData> = []

    for (let key in this.curvedata) {
      console.log('updateTableCurve'+key)
      let curve = this.curvedata[key]
      let dates = curve.timeSeries.getDates()
      let values = curve.timeSeries.getValues()
      for (var i = 0; i < dates.length; i++) {
        


        data.push( {
          currency: curve.currency,
          basis: curve.basis,
          periodicity: curve.periodicity,
          curvetype: curve.curve,
          curvemethod: curve.curvemethod,
          date:this.datapipe.transform(dates[i], 'yyyy-MM-dd'),
          value: ''+values[i]
        })
      }
    }
      this.dataSource = new MatTableDataSource(data) 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

  }

  updateGraph(curve: Curve)
  {

      this.traces.push(
        {
            dimension: curve.timeSeries.getDates(),
            dimensionName: "curve.currency",
            measure: curve.timeSeries.getValues(),
            measureName: curve.getCurveID(),
            type: ChartType.spline
        }
      )
      this.curvekey.push(curve.getCurveID())
  }

  drawGraph()
  {
    this.traces = []

    for (let key in this.curvedata) {
  
      let curvedata = this.curvedata[key]
      this.traces.push(
        {
            dimension: curvedata.timeSeries.getDates(),
            dimensionName: curvedata.currency,
            measure: curvedata.timeSeries.getValues(),
            measureName: key,
            type: ChartType.spline
        }
      )
    }
  }



  //UI Event
  updateCurveType(){
    if (this.curve === 'arr')
    this.curvemethod= "simple"
    else
    this.curvemethod= null
  }

  CheckButton(e){
 if (this.currency != undefined 
    && this.basis != undefined
    && this.periodicity != undefined
    )
    this.isCurveValid = true
   console.log(this.isCurveValid)
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
