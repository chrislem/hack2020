
import { TimeSeries } from './timeseries.model';
import { DatePipe } from '@angular/common';
import { mapRevertBasis, mapCurrencyARR } from '../data/common';

export class Curve {
    curveid: string =''
    timeSeries :TimeSeries = undefined
    datepipe : DatePipe
    constructor(
       public currency: string, 
       public basis: string, 
       public periodicity: string, 
       public curve: string, 
       public curvemethod: string
    ){
        this.datepipe = new DatePipe("en-US")
        this.curveid += currency+basis+periodicity+curve+(curve == 'arr'?curvemethod:'')
    
    }

    getInputJson(){

        let rateindex: string
        if(this.curve === 'arr') 
            rateindex = mapCurrencyARR.get(this.currency)
        else
        {
            if(this.currency === 'EUR')
                rateindex = 'EURIBOR_'+this.periodicity
            else
                rateindex = this.currency+'_LIBOR_'+this.periodicity
            rateindex = rateindex.toUpperCase()
        }

        let interestMethod: string
        let fixingperiodicity: string='1d'
        if(this.curve === 'standard') 
        {
            interestMethod = "Simple"
            fixingperiodicity = ''
        }
        else if (this.curvemethod === 'arr')
            interestMethod = 'RFRAVRCompounding'
        else
            interestMethod = 'RFRAVRSimple'
        

        return {
            records :
            {
                AmortizationType : "Bullet",
                BalanceSheetDate : '15/12/2020',///this.datepipe.transform(Date.now(), 'dd/MM/yyyy'),
                Basis : mapRevertBasis.get(this.basis),
                ContractReference : "CurveFixing",
                ContractStructure : "SimpleInterestStream",
                Currency : this.currency,
                FixingPeriodicity : '1d',
                InterestMethod : interestMethod,
                InterestPaymentDetermination : "Post",
                InterestPeriodicity : this.periodicity,
                InterestRateIndex : rateindex,
                InterestRateType : "Variable",
                MaturityDate : "15/12/2030",
                OriginDate : '15/12/2020',//this.datepipe.transform(Date.now(), 'dd/MM/yyyy'),
                Principal : 1
                  
                
            }
        }
    }

    addNewTimeSeries(jsonObject)
    {
        this.timeSeries = TimeSeries.fromJson(jsonObject)
    }
   
    getCurveID(){
        return this.curveid
    }


}