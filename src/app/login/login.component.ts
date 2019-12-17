import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { e } from '@angular/core/src/render3';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('nameInput') nameId: ElementRef;
  @ViewChild('telInput') telId: ElementRef;

  private _headers = {headers: new HttpHeaders().set('Content-Type', 'application/json')};


  name: string;
  tel: string;
  submitted = false;

  //constructor() { }
  constructor(private router:Router,private http:HttpClient) { }

  ngOnInit() {
  }

  onSubmit(name: string,tel: string) {
    console.log("login");
    this.submitted = true;
    this.login(this.nameId.nativeElement.value,this.telId.nativeElement.value);


  }

   login(name: string,tel: string){

    let nameStr = name;
    let telStr = tel;

    let userJSON = {
     'header': {
       'msgId': '1',
       'txnSeq': '2',
       'branchId': '3',
       'clientIp': '4'
      },
      'body': {
       'name': name,
       'tel': tel
      }
    };

     // 透過 JSON.parse() 解析 JSON 字串
     let user = JSON.stringify(userJSON);
     var newstr = user

     console.log(
      "newstr"+newstr
     );

     var objJsonArray =JSON.parse(newstr);


    this.http.post('http://localhost:8080/login',objJsonArray
              ,this._headers).subscribe(
                res => {
                  const returnText = res['body'].returnCode;
                  if('0000'=== returnText){
                    console.log("登入成功");
                    this.router.navigate(['home']); // <-- 導向HomeComponent
                    return;
                  }else{
                    console.log("無法登入");
                    this.router.navigate(['login']); // <-- 導向LoginComponent
                    return;
                  }
                },errRes =>{
                  console.log(errRes);
                }
              );
   }

}
