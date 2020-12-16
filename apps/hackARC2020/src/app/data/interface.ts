export interface ICurveData {
    currency: string
    basis: string
    periodicity: string
    curve:string
    curvemethod:string
    dates: any
    values: any
 }

 export class CurveData implements ICurveData{
    currency: string
    basis: string
    periodicity: string
    curve:string
    curvemethod:string
    dates: any
    values: any
 }
 
 export interface ICustomer{
   first_name: string,
   last_name: string,	
   email: string,	
   gender: string,	
   address: string,	
   city: string,	
   country: string   
}

export interface IContract
{
   contractref: string,
   currency: string,
   interestperiodicity: string,
   amortizationType: string,
   balance: number,
   basis: string,
   clientratespread: number,
   interestrateindex: string,
   maturitydate: Date,
   origindate: Date,
   contractType: string,
   partyref: string
   
}
