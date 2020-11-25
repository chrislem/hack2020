import { Component, OnInit } from '@angular/core';
import { ArcInstance } from '../../services/arcInstance.service';

@Component({
  selector: 'ffdc-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  customer: any
  tabDeals : any = []
  isnewCustomer = false


  constructor(private arcInstance: ArcInstance) { }

  ngOnInit(): void {
  }

  viewCustomer(){
    console.log('viewCustomer')

    this.tabDeals=[]
    this.isnewCustomer = true

    this.arcInstance.test()
  }


  ComputeDeal(id: string, name:string)
  {
    this.tabDeals.push({
      id: id,
      name: name})
    console.log('tabdeals:'+ this.tabDeals)

  }


}
