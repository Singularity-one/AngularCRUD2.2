import { Component, OnInit , ElementRef, ViewChild  } from '@angular/core';

import { Customer } from '../customer';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { stringify } from 'querystring';

@Component({
  selector: 'app-find-all',
  templateUrl: './find-all.component.html',
  styleUrls: ['./find-all.component.css']
})
export class FindAllComponent implements OnInit {

  // [x: string]: any;  不明

  @ViewChild('nameInput') nameId: ElementRef;
  @ViewChild('addrInput') addrId: ElementRef;
  @ViewChild('ageInput') ageId: ElementRef;
  @ViewChild('telInput') telId: ElementRef;

  private _headers = {headers: new HttpHeaders().set('Content-Type', 'application/json')};
  customerId: string;
  name: string;
  addr: string;
  age: string;
  tel: string;
  customers: Customer[];

  constructor(private router:Router, private customerService: CustomerService,private http:HttpClient) { }

  ngOnInit() {

     this.customerService.getUsers().subscribe( data =>{
       this.customers =data;
       console.log(data);
       const returnText = data['body'].returnCode;
       if('0000'=== returnText){
        console.log("讀入全部資料");
        const body = data['body'];
        this.customerId =body.customerId;
        this.name =body.name;
        this.addr =body.addr;
        this.age =body.age;
        this.tel =body.tel;
        this.customers = body.dataList;
       }
     })
      console.log("進入這頁面時發生");
      
  }


  updateCustomer(customerId:string){
    console.log(customerId);
    console.log("傳去customerService的id:"+customerId);
    this.customerService.clear();//輸入前先清除舊訊息
    this.customerService.add(customerId);//傳給customerService
    this.router.navigate(['updata']); // <-- 導向UpataComponent
    
  }

  customerDetails(customerId:string){
    console.log(customerId);
    console.log("傳去customerService的id:"+customerId);
    this.customerService.clear();//輸入前先清除舊訊息
    this.customerService.add(customerId);//傳給customerService
    this.router.navigate(['customer-details']); // <-- 導向CustomerDetailsComponent
  }

  deleteCustomer(customerId:string){
    console.log(customerId);
    this.delet(customerId);
  }

  delet(customerId){
    let customerIdStr = customerId;

    let userJSON = {
      'header': {
        'msgId': '1',
        'txnSeq': '2',
        'branchId': '3',
        'clientIp': '4'
      },
      'body': {
        "customerId": customerId
      }
    };

     // 透過 JSON.parse() 解析 JSON 字串
     let user = JSON.stringify(userJSON);
     var newstr = user

     console.log(
      "newstr"+newstr
     );

     var objJsonArray =JSON.parse(newstr);

     this.http.post('http://localhost:8080/customer/deleteBySQL',objJsonArray
     ,this._headers).subscribe(
                  res => {
                   console.log(res);
                    if(res['success']){
                      console.log("success");
                    }
                    const returnText = res['body'].returnCode;
                    if('0000'=== returnText){
                     console.log("登入成功");
                     this.ngOnInit();//重新載入刷新頁面
                     //this.router.navigate(['home']); // <-- 導向HomeComponent
                    }
                  },errRes =>{
                    console.log(errRes);
                  }
                );

  }


}
