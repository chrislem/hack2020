import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'arro-deal-card',
  templateUrl: './deal-card.component.html',
  styleUrls: ['./deal-card.component.scss']
})
export class DealCardComponent implements OnInit {

//Deals
@Input() deal

  constructor() { }

  ngOnInit(): void {

    console.log(this.deal)
  }

}
