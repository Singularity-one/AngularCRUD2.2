import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Customer } from '../customer';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-updata',
  templateUrl: './updata.component.html',
  styleUrls: ['./updata.component.css']
})
export class UpdataComponent implements OnInit {

 
  //protected scustomeridSQLid2: string[] = [];


  @ViewChild('customerIdInput') customerIdId: ElementRef;
  @ViewChild('nameInput') nameId: ElementRef;
  @ViewChild('addrInput') addrId: ElementRef;
  @ViewChild('ageInput') ageId: ElementRef;
  @ViewChild('telInput') telId: ElementRef;

  //private headers =new HttpHeaders().append('Conten-Type','application/json');
  private _headers = {headers: new HttpHeaders().set('Content-Type', 'application/json')};
  customerId: string;
  name: string;
  addr: string;
  age: string;
  tel: string;
  customers: Customer[];
  submitted = false;

  placeholderText='xxx';

  constructor(private router:Router, private customerService: CustomerService,private http:HttpClient) {
        console.log("這是修改頁面");
   }

  protected scustomeridSQLid2: string[] = [];


  ngOnInit() {
    // console.log(this.param);
    // this.findOne(this.param);

    this.scustomeridSQLid2 = this.customerService.messages;
    console.log("有接到值"+this.scustomeridSQLid2 );

    this.customerId =this.scustomeridSQLid2.toString();
    this.findOne(this.customerId);
    //this.customerService.clear();//清除customerService中massage(無法用,因為必須修改後傳入後端)
  }

  onSubmit(customerId: string,name: string,addr: string,age: string,tel: string) {
    console.log("createcustomer");
    this.submitted = true;
    this.updata(this.scustomeridSQLid2.toString(),
      this.nameId.nativeElement.value,
      this.addrId.nativeElement.value,
      this.ageId.nativeElement.value,
      this.telId.nativeElement.value
      );
  }
     
  updata(customerId,name,addr,age,tel){
    //  let customerIdStr = customerId;
    //  let nameStr = name;
    //  let addrStr = addr;
    //  let ageStr = age;
    //  let telStr = tel;

     let userJSON = {
      'header': {
        'msgId': '1',
        'txnSeq': '2',
        'branchId': '3',
        'clientIp': '4'
      },
      'body': {
        "customerId": customerId,
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


     this.http.post('http://localhost:8080/customer/updata2',objJsonArray
    ,this._headers).subscribe(
                 res => {
                  console.log(res);
                   if(res['success']){
                     console.log("success");
                   }
                   const returnText = res['body'].returnCode;
                   if('0000'=== returnText){
                    console.log("登入成功");
                    this.router.navigate(['find-all']); // <-- 導向HomeComponent
                   }
                 },errRes =>{
                   console.log(errRes);
                 }
               );

  }



  findOne(customerId){
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


     this.http.post('http://localhost:8080/customer/findSQL',objJsonArray
    ,this._headers).subscribe(
                 res => {
                  console.log(res);
                   if(res['success']){
                     console.log("success");
                   }
                   const returnText = res['body'].returnCode;
                   if('0000'=== returnText){
                    console.log("成功拿到單筆回傳");
                    console.log(res);
                    const body = res['body'];
                    this.customerId =body.customerId;
                    this.name =body.name;
                    this.addr =body.addr;
                    this.age =body.age;
                    this.tel =body.tel;
                    this.customers = body.dataList;
                    console.log(this.customers);

                   }
                 },errRes =>{
                   console.log(errRes);
                 }
               );


  }

}
