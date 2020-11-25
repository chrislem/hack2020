import { TimeSeries } from './timeseries.model'

export class Contract {

    //input data
    contractReference: string
    currency: string
    amortizationType: string
    principalPeriodicity: string
    interestRateType: string
    interestPeriodicity: string
    interestRateIndex: string
    interestMethod: string
    fixedRate: number
    principal: number
    originDate: Date
    maturityDate: Date
    balanceSheetDate: Date

    //computed
    npv: number
    cfInterest: TimeSeries
    cfPrincipal: TimeSeries
    cfOutstanding: TimeSeries
    fixing: TimeSeries


    constructor(){

    }

    public static fromJson(json: Object): Contract {

        var contract = new Contract()
        contract.contractReference = json['ContractReference']
        contract.amortizationType = json['AmortizationType']
        contract.principalPeriodicity = json['PrincipalPeriodicity']
        contract.interestRateType = json['InterestRateType']
        contract.interestPeriodicity = json['InterestPeriodicity']
        contract.interestRateIndex = json['InterestRateIndex']
        contract.interestMethod = json['InterestMethod']
        contract.fixedRate = json['FixedRate']
        contract.principal = json['Principal']
        contract.originDate = new Date(json['OriginDate'])
        contract.maturityDate = new Date(json['MaturityDate'])
        contract.balanceSheetDate = new Date(json['BalanceSheetDate'])

        contract.cfInterest = TimeSeries.fromJson(json['CFInterests'])
        contract.cfPrincipal = TimeSeries.fromJson(json['CFPrincipals'])
        contract.cfOutstanding = TimeSeries.fromJson(json['CFOutstandingPrincipals'])      
        contract.fixing = TimeSeries.fromJson(json['Fixings'])   

        return contract
    }

}