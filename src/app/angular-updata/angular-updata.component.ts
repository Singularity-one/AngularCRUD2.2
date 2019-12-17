import { Component, OnInit, Output, EventEmitter, ElementRef, Pipe } from '@angular/core';
import { CustomerService } from '../customer.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';


@Component({
  selector: 'app-angular-updata',
  templateUrl: './angular-updata.component.html',
  styleUrls: ['./angular-updata.component.css']
  

})



export class AngularUpdataComponent implements OnInit {

  private _headers = {headers: new HttpHeaders().set('Content-Type', 'application/json')};

  submitted = false;
  pic:string;
  data:string;
  user_photo: SafeResourceUrl;
  show =false;
  



  constructor(private router:Router,private http:HttpClient, private customerService: CustomerService,private sanitizer: DomSanitizer) {
    console.log("這是修改頁面");
   
  }


  ngOnInit() {   
  }

  updataIMGfront(){ //送出
    console.log("updataIMG");
    this.submitted = true;
    this.updataIMG();
  }

updataIMG(){
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
      "merchantId": '2',
      'name': 'xxxx',
      'addr': '上海',
      'tel': '0999999',
      'pic':'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg=='
    }
  };

     // 透過 JSON.parse() 解析 JSON 字串
     let user = JSON.stringify(userJSON);
     var newstr = user

     console.log(
      "newstr"+newstr
     );

     var objJsonArray =JSON.parse(newstr);


   this.http.post('http://localhost:8080/merchant/save2',objJsonArray
  ,this._headers).subscribe(
               res => {
                console.log(res);
                 if(res['success']){
                   console.log("success");
                 }
                 const returnText = res['body'].returnCode;
                 if('0000'=== returnText){
                  console.log("上傳成功");

                  const body = res['body'];
                  this.data=body.pic;
                  console.log("路徑"+this.data);

                  this.show=true;//點擊秀出全部
                  // this.pic = this.sanitizer.bypassSecurityTrustResourceUrl(this.data);
                  this.photo_url(this.data)
                 
                  

                  this.router.navigate(['angular-updata']); // <-- 導向HomeComponent

                 }
               },errRes =>{
                 console.log(errRes);
               }
             );

}

photo_url(data: string){
  this.user_photo = this.sanitizer.bypassSecurityTrustResourceUrl(data);
}



}
