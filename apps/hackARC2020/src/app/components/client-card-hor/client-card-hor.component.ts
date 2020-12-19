import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'arro-client-card-hor',
  templateUrl: './client-card-hor.component.html',
  styleUrls: ['./client-card-hor.component.scss']
})
export class ClientCardHorComponent implements OnInit {

  @Input() client;

  deals: any
  constructor() { }

  ngOnInit(): void {
  }

}
