import { Component, OnInit } from '@angular/core';
import { basis, currencies, periodicity } from '../../data/common';
@Component({
  selector: 'ffdc-origination',
  templateUrl: './origination.component.html',
  styleUrls: ['./origination.component.scss']
})
export class OriginationComponent implements OnInit {

//list
basis_list = basis
periodicity_list = periodicity
currency_list = currencies

//variable
periodicity: string
currency: string
basis: string
originDate: Date
maturityDate: Date
principal: number



  constructor() { }

  ngOnInit(): void {
  }

//UI Event


}
