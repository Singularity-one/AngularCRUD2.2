  
import { Injectable, EventEmitter, Output } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Customer } from './customer';
import { Observable } from 'rxjs';

const httpOptions ={ headers : new HttpHeaders({ 'Content-Type':'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customer: Customer;

  customerId: string;
  name: string;  
  addr: string;
  age: string;
  tel: string;
  customers: Customer[];
  
  constructor(private http:HttpClient) { }

  public getUsers() {
  return this.http.get<Customer[]>('http://localhost:8080/customer/findAll');
  }

  public getCustomerByName(name : String){
    return this.http.get<Customer[]>('http://localhost:8080/customer/findByName');
    //return this.http.post<Customer[]>('http://localhost:8080/customer/findByName',JSON.stringify(),);
  }


  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }


}
