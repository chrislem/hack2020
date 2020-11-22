import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ffdc-newclient',
  templateUrl: './newclient.component.html',
  styleUrls: ['./newclient.component.scss']
})
export class NewclientComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  results: any[];
  documents: any[] = [
    {
      accountType: 'EUR',
      nickname: 'Personal Account',
      balances: [
        {
          type: 'current',
          amount: 1000
        }
      ],
      id: '3658'
    },
    {
      accountType: 'EUR',
      nickname: 'Savings Account',
      balances: [
        {
          type: 'current',
          amount: 22000
        }
      ],
      id: '5811'
    },
    {
      accountType: 'USD',
      nickname: 'Forex Account',
      balances: [
        {
          type: 'current',
          amount: 1500
        }
      ],
      id: '4127'
    }
  ];

  onSearchTermChange(value: string) {
    // Implement real search instead of this ;)
    this.results = value ? [this.documents[0]] : [];
    console.log(value)
  }


  
}
