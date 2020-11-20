import { stringify } from 'querystring';

export class User {
    id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    token: string;
    constructor(){
        this.id='';
        this.username='';
        this.password='';
        this.firstName='';
        this.lastName='';
        this.email='';
        this.token='';
    }
}