import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'arro-client-card',
  templateUrl: './client-card.component.html',
  styleUrls: ['./client-card.component.scss']
})
export class ClientCardComponent implements OnInit {

  @Input() deal;

  constructor() { }

  ngOnInit(): void {
  }

}
