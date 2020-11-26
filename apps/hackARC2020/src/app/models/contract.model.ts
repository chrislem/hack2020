import { TimeSeries } from './timeseries.model'
import { mapBasis, mapCurrencyARR, mapRevertBasis } from '../data/common';
import { DatePipe } from '@angular/common';
export class Contract {

    //input data


    //computed
    npv: number
    cfInterest: TimeSeries
    cfPrincipal: TimeSeries
    cfOutstanding: TimeSeries
    fixing: TimeSeries


    datepipe : DatePipe

    constructor(
       public contractref: string,
       public  currency: string,
       public  basis: string,
       public  amortaizationType: string,
       public  principalperiodicty: string,
       public  interestmethod: string,
       public  interestperiodicity: string,
       public  interestratetype: string,
       public  interestrateindex: string,
       public  origindate: Date,
       public  maturitydate: Date,
       public  principal: number,
       public  clientratespread: number,
       public  lookback: number,
       public  lockout: number
    ){
        this.datepipe = new DatePipe("en-US")
    }


    getInputJson(){   

        return {
            records :
            {
                ContractReference : this.contractref,
                Currency : this.currency,
                Basis : mapRevertBasis.get(this.basis),
                AmortizationType : this.amortaizationType,
                PrincipalPeriodicity: this.principalperiodicty,
                InterestMethod : this.interestmethod,
                InterestPaymentDetermination : "Post",
                InterestPeriodicity : this.interestperiodicity,
                InterestRateIndex : this.interestrateindex,
                InterestRateType : this.interestratetype,
                MaturityDate : this.datepipe.transform(this.maturitydate, 'dd/MM/yyyy'),
                OriginDate : this.datepipe.transform(Date.now(), 'dd/MM/yyyy'),
                BalanceSheetDate : this.datepipe.transform(Date.now(), 'dd/MM/yyyy'),
                Principal : this.principal,
                ClientRateSpread : this.clientratespread,
                FixedRate : this.clientratespread,
                LookBackPeriod : this.lookback,
                LockoutPeriod : this.lockout 
                
            }
        }
    }



}