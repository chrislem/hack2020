import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'arro-dealrenego',
  templateUrl: './dealrenego.component.html',
  styleUrls: ['./dealrenego.component.scss']
})
export class DealrenegoComponent implements OnInit {


  @Input() originalDeal;

  constructor() { }

  ngOnInit(): void {
  }

}
