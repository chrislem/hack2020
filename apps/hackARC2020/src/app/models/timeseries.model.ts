
export class TimeSeries{

    private timeSeries: {date: Date, value: number}[]
    private dates: Date[] =[]
    private values: number[] = []
    
    constructor(timeSeries: {date: Date, value: number}[],
                dates: Date[],
                values: number[] )
    {
        if(timeSeries != null)
        {
        this.timeSeries = timeSeries
        this.dates = dates
        this.values = values
        }
    }

    public static fromJson(json: Object): TimeSeries {

        var timeSeries : {date: Date, value: number}[] = []
        var dates : Date[] = []
        var values : number[] = []

        if (typeof json === 'object')
        { 
            let jsonarray = <[]>json 
           // console.log(jsonarray)
            for(let i=0; i < jsonarray.length; i=i+2)
            {
                let  date = new Date(jsonarray[i])
                let value: number = jsonarray[i+1]
                
                dates.push(date)
                values.push((Math.round(value*100)/100))
            }
       
        }
        else 
            console.log('not an array')
        
        return new TimeSeries(timeSeries, dates, values)
    }

    public getDates()
    {
        return this.dates
    }

    public getValues()
    {
        return this.values
    }

    public getTimeSeries()
    {
        return this.timeSeries
    }

}