import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LegendPosition, ChartType, ChartOrientation } from '@ffdc/uxg-angular-components/chart';

@Component({
  selector: 'ffdc-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss']
})
export class RateComponent implements OnInit {
  legendPosition = LegendPosition.horizontalBottomCenter;

  currencies = []
  basislist = []
  periodicities = []

  

  currency = new FormControl();
  basis = new FormControl();
  periodicity = new FormControl();
  curvemode = new FormControl();
  curvemethod  = new FormControl();

  constructor() { }

  ngOnInit(): void {
  }

  submitRateDef() {
    console.log(this.currency.value);
  }

  traces2 = [
    {
      dimension: ['Banks', 'Foods', 'Energies'],
      dimensionName: 'Industry',
      measure: [100, 50, 70],
      measureName: 'PNL',
      type: ChartType.spline,
      orientation: ChartOrientation.horizontal
    },
    {
      dimension: ['Banks', 'Foods', 'Energies'],
      dimensionName: 'Industry',
      measure: [75, 10, 90],
      measureName: 'Asset Values',
      type: ChartType.spline,
      orientation: ChartOrientation.horizontal
    },
    {
      dimension: ['Banks', 'Foods', 'Energies'],
      dimensionName: 'Industry',
      measure: [75, 10, 90],
      measureName: 'Asset',
      type: ChartType.bar,
      orientation: ChartOrientation.horizontal
    }
  ];

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
