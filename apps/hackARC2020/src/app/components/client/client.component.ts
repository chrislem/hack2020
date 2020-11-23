import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ffdc-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  customer: any
  tabDeals : any = []
  isnewCustomer = false


  constructor() { }

  ngOnInit(): void {
  }

  viewCustomer(){
    console.log('viewCustomer')

    this.tabDeals=[]
    this.isnewCustomer = true


  }


  ComputeDeal(id: string, name:string)
  {
    this.tabDeals.push({
      id: id,
      name: name})
    console.log('tabdeals:'+ this.tabDeals)

  }


}
