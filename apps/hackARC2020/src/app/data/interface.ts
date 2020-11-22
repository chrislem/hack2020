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
 