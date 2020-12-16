import { Component, OnInit, NgModule } from '@angular/core';
import { ArcInstance } from '../../services/arcInstance.service';
import { BankinAPIServiceService } from '../../services/bankin-apiservice.service';
import { OAuthServiceService } from '../../services/oauth-service.service';
import { contractTypes, Customers} from '../../data/common';
import { Options , LabelType} from '@angular-slider/ngx-slider';
import { MatTableDataSource } from '@angular/material/table';
import { IContract, ICurveData, ICustomer } from '../../data/interface';
import { DatePipe } from '@angular/common';
import { ClientCardComponent } from '../client-card/client-card.component';

@Component({
  selector: 'ffdc-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {



//data
contractTypes = contractTypes

displayedColumns: string[] = ['contractref', 'balance', 'origindate', 'maturitydate', 'interestrateindex', 'clientratespread', 'name', 'status'];
dataSource: MatTableDataSource<object>;

test: any
  contractType: any
  minValue: number = 100;
  maxValue: number = 400;
  deals = []

  options: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return "<b>Min price:</b> $" + value;
        case LabelType.High:
          return "<b>Max price:</b> $" + value;
        default:
          return "$" + value;
      }
    }
  };

  constructor(private arcInstance: ArcInstance, private oauthService: OAuthServiceService
    ,private bankingService: BankinAPIServiceService, private datapipe: DatePipe) { }

  ngOnInit(): void {
    this.oauthService.getAccessToken()
  }

  viewCustomer(){
    console.log('viewCustomer')



    //
    //this.bankingService.test()






  }


  ComputeDeal(id: string, name:string)
  {
 

  }

  updateStatus()
  {

    this.deals.forEach( ( deal, index) => 
    {
      this.arcInstance.computeContract(
        deal.contractRef
        ,deal.currency
        , deal.basis
        , deal.amortizationType
        , deal.principalperiodicty
        , deal.interestmethod
        , deal.interestperiodicity
        , "Variable"
        , deal.interestrateindex
        , deal.origindate
        , deal.maturitydate
        , deal.balance
        , deal.clientratespread
        , 0
        , 0
        , deal.fixedrate
      ).subscribe(contractreceived => {
        console.log(contractreceived)
        this.dataSource.data[index]["status"] = 0;
      })
      

    })


  }

  portfolioChange(e){

      this.deals = this.arcInstance.getDeals(e.value)
      console.log(this.deals)
      var data = []
      for (var deal of this.deals) {

        let client = Customers[deal.partyref]
        var now = new Date()
       
        var nbdays = (deal.maturitydate.getTime() - now.getTime())/(1000 * 3600 * 24); 

          data.push( {
            contractref: deal.contractref,
            balance: deal.balance,
            origindate: this.datapipe.transform(deal.origindate, 'yyyy-MM-dd'),
            maturitydate: nbdays,

            interestrateindex: deal.interestrateindex,
            clientratespread: deal.clientratespread,
            name: client.first_name+" "+client.last_name,
            status: 1,
            clientRef: deal.partyref
          })
        }
      this.dataSource = new MatTableDataSource(data) 
      this.updateStatus()
     }

     showClient(id: string)
     {
       console.log(id)
       this.test = Customers[id]
       let client = Customers[id]
     }

}
