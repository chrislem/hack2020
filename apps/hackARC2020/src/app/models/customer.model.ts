import { Contract } from './contract.model';

export class Customer {
    
    public contracts: Array<Contract> = []
    /*public static fromJson(json: Object): Customer {

        console.log(json)
        return new Customer()
    }
    */

    constructor(public name: string,
                public address1: string,
                public address2: string,
                public zipcode: string,
                public country: string ){

    }



}