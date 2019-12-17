import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Customer } from '../customer';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';



import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-createcustomer',
  templateUrl: './createcustomer.component.html',
  styleUrls: ['./createcustomer.component.css']
})
export class CreatecustomerComponent implements OnInit {

  @ViewChild('nameInput') nameId: ElementRef;
  @ViewChild('addrInput') addrId: ElementRef;
  @ViewChild('ageInput') ageId: ElementRef;
  @ViewChild('telInput') telId: ElementRef;

  private headers = {headers: new HttpHeaders().set('Content-Type', 'application/json')};
  customerId: string;
  name: string;
  addr: string;
  age: string;
  tel: string;
  customers: Customer[];
  submitted = false;

  constructor(private router:Router, private customerService: CustomerService,private http:HttpClient) { }

  ngOnInit() {

  }

  onSubmit(name: string,addr: string,age: string,tel: string) {
    console.log("createcustomer");
    this.submitted = true;
    this.createcustomer(this.nameId.nativeElement.value,
      this.addrId.nativeElement.value,
      this.ageId.nativeElement.value,
      this.telId.nativeElement.value
      );
  }
     
  createcustomer(name,addr,age,tel){

     let userJSON = {
      'header': {
        'msgId': '1',
        'txnSeq': '2',
        'branchId': '3',
        'clientIp': '4'
      },
      'body': {
        'name': name,
        'addr': addr,
        'age': age,
        'tel': tel,
      }
    };

    // 透過 JSON.parse() 解析 JSON 字串
    let user = JSON.stringify(userJSON);
    var newstr = user

    console.log(
     "newstr"+newstr
    );

    var objJsonArray =JSON.parse(newstr);

     this.http.post('http://localhost:8080/customer/save2',objJsonArray
    ,this.headers).subscribe(
                 res => {
                  console.log(res);
                  const returnText = res['body'].returnCode;
                   
                  if('0000'=== returnText){
                    console.log("創建成功");
                    this.router.navigate(['find-all']); // <-- 導向FindAllComponent
                   }
                 },errRes =>{
                   console.log(errRes);
                 }
               );
  }



}
