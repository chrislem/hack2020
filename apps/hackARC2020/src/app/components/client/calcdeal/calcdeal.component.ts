import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'arro-calcdeal',
  templateUrl: './calcdeal.component.html',
  styleUrls: ['./calcdeal.component.css']
})
export class CalcdealComponent implements OnInit {


  @Input() deal: any;

  constructor() { }

  ngOnInit(): void {
  }

}
