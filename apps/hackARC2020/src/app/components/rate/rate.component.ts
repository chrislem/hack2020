import { Component, OnInit,  ViewChild} from '@angular/core';
import { LegendPosition, ChartType, ChartOrientation } from '@ffdc/uxg-angular-components/chart';

import { basis, currencies, periodicity } from '../../data/common';
import { ICurveData } from '../../data/interface';
import { ArcInstance } from '../../services/arcInstance.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

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
  curvedata: { [id: string]: ICurveData; } = {}
  curvekey= []
  traces = []
//Tab group
tabInit = 0
//table
displayedColumns: string[] = ['currency', 'basis', 'periodicity', 'curvetype', 'curvemethod', 'date', 'value'];
dataSource: MatTableDataSource<TableCurevData>;

@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

  constructor(private arcInstance: ArcInstance) {
  
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

    let curvedata: ICurveData

    console.log(this.currency);
    console.log(this.basis);
    console.log(this.periodicity);
    console.log(this.curve);
    console.log(this.curvemethod);

    let idcurve = ''
    idcurve += this.currency+this.basis+this.periodicity+this.curve+(this.curve == 'standard'?this.curvemethod:'')
    console.log('id:'+idcurve)

    curvedata = this.arcInstance.getCurveData(
      this.currency,
      this.basis,
      this.periodicity,
      this.curve,
      this.curvemethod  
    )

    if(this.curvedata[idcurve] == undefined)
    {
      this.curvedata[idcurve] = curvedata
      this.updateGraph(idcurve,curvedata)
      this.updateTableCurve()
      this.tabInit = 0;
    }


  }

  updateTableCurve()
  {
    var data: Array<TableCurevData> = []

    for (let key in this.curvedata) {
      console.log('updateTableCurve'+key)
      for (var i = 0; i < this.curvedata[key].dates.length; i++) {
        
        data.push( {
          currency: this.curvedata[key].currency,
          basis: this.curvedata[key].basis,
          periodicity: this.curvedata[key].periodicity,
          curvetype: this.curvedata[key].curve,
          curvemethod: this.curvedata[key].curvemethod,
          date:this.curvedata[key].dates[i],
          value: this.curvedata[key].values[i],
        })
      }
    }
      this.dataSource = new MatTableDataSource(data) 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

  }

  updateGraph(key: string, curvedata: ICurveData)
  {

      this.traces.push(
        {
            dimension: curvedata.dates,
            dimensionName: curvedata.currency,
            measure: curvedata.values,
            measureName: key,
            type: ChartType.spline
        }
      )
      this.curvekey.push(key)
  }

  drawGraph()
  {
    this.traces = []

    for (let key in this.curvedata) {
  
      let curvedata = this.curvedata[key]
      this.traces.push(
        {
            dimension: curvedata.dates,
            dimensionName: curvedata.currency,
            measure: curvedata.values,
            measureName: key,
            type: ChartType.spline
        }
      )
           // Use `key` and `value`
    }
  }



  //UI Event
  updateCurveType(){
    if (this.curve === 'standard')
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
