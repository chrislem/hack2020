import { Component, OnInit, Input } from '@angular/core';
import { Contract } from '../../../models/contract.model';

@Component({
  selector: 'arro-calcdeal',
  templateUrl: './calcdeal.component.html',
  styleUrls: ['./calcdeal.component.css']
})
export class CalcdealComponent implements OnInit {


  @Input() deal: Contract;

  constructor() { }

  ngOnInit(): void {
  }

}
