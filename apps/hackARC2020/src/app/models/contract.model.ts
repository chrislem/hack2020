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
    contractType: string
    partyRef: string


    datepipe : DatePipe

    constructor(
       public contractref: string,
       public  currency: string,
       public  basis: string,
       public  amortizationType: string,
       public  principalperiodicty: string,
       public  interestmethod: string,
       public  interestperiodicity: string,
       public  interestratetype: string,
       public  interestrateindex: string,
       public  origindate: Date,
       public  maturity: string,
       public  principal: number,
       public  clientratespread: number,
       public  lookback: number,
       public  lockout: number,
       public fixedrate: number,
       public balance: number
    ){
        this.datepipe = new DatePipe("en-US")
    }

    getInputJson(){   

        return {
            records :
            {
                ContractReference : this.contractref,
                Currency : this.currency,
                Basis : this.basis,
                AmortizationType : this.amortizationType,
                PrincipalPeriodicity: this.principalperiodicty,
                InterestMethod : this.interestmethod,
                InterestPaymentDetermination : "Post",
                InterestPeriodicity : this.interestperiodicity,
                InterestRateIndex : this.interestrateindex,
                InterestRateType : this.interestratetype,
                DealMaturity : this.maturity,
                OriginDate : this.datepipe.transform(this.origindate, 'dd/MM/yyyy'),
                BalanceSheetDate : this.datepipe.transform(Date.now(), 'dd/MM/yyyy'),
                Principal : this.principal,
                Balance : this.principal,
                ClientRateSpread : this.clientratespread,
                FixedRate : this.fixedrate,
                LookBackPeriod : this.lookback,
                LockoutPeriod : this.lockout 
                
            }
        }
    }



}