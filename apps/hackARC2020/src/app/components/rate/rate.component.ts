import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, Form, FormGroup } from '@angular/forms';
import { LegendPosition, ChartType, ChartOrientation } from '@ffdc/uxg-angular-components/chart';
import { basis, currencies, periodicity } from '../../data/common';
import { tracesmock, curvemock } from '../../data/mockdata';

@Component({
  selector: 'ffdc-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss']
})
export class RateComponent implements OnInit {
  legendPosition = LegendPosition.horizontalBottomCenter;

  //Data form
  currencies = currencies
  basislist = basis
  periodicities = periodicity

  //form elements
  currency: any
  basis: any
  periodicity: any
  curve= "standard"
  curvemethod= "simple"
  isCurveValid = false
 
  // curve data
  traces = []

  constructor() {
  
   }

  ngOnInit(): void {

    }


  submitRateDef() {
    console.log(this.currency);
    console.log(this.basis);
    console.log(this.periodicity);
    console.log(this.curve);
    console.log(this.curvemethod);

    let idcurve = ''
    idcurve += this.currency+this.basis+this.periodicity+this.curve+(this.curve == 'standard'?this.curvemethod:'')
    console.log('id:'+idcurve)
    let curvedata = curvemock[idcurve]
    console.log('curve'+curvedata)
    if (curvedata != null &&  curvedata != undefined) 
      this.traces.push(curvedata)
    else
     this.traces.push(curvemock['default'])



  }

  updateCurveType(){
    if (this.curve === 'standard')
    this.curvemethod= "simple"
    else
    this.curvemethod= null
  }

  CheckButton(e){
    console.log(e)
    
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
