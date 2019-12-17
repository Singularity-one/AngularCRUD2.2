import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-find-all-with-page',
  templateUrl: './find-all-with-page.component.html',
  styleUrls: ['./find-all-with-page.component.css']
})
export class FindAllWithPageComponent implements OnInit {

  // title = '測試專案';//父傳子

  // totalValue = 0;//子上父
  // add(value) {
  //   this.totalValue += value;
  // }

  public productsPerPage =4;
  public selectedPage=1;

  changePage(newPage: number){
    console.log("現在頁面"+newPage);
    this.selectedPage=newPage;
    this.changePagetoEnd(newPage-1);
  }

  changePageSize(newSize: number){
    console.log("下拉式現在頁面"+newSize);
    this.productsPerPage=Number (newSize);
    this.changePagetoEnd(newSize-1);
  }

  get pageNumbers(): number[]{
    console.log("總頁數計算新分頁數"+this.totalPages);   
    var numbers = []; 
    for (var i = 1; i <= parseInt(this.totalPages); i++) {   //一个个压入页码
      console.log(i);   
      numbers.push(i);
    }
    console.log(numbers);   
    
    return numbers;
  }


  private headers = {headers: new HttpHeaders().set('Content-Type', 'application/json')};
  customerId: string;
  name: string;
  addr: string;
  age: string;
  tel: string;
  page:string;
  size:string;
  totalPages:string;
  customers: Customer[];

  constructor(private http:HttpClient, private customerService: CustomerService) {
    console.log("這是修改頁面");
}

  ngOnInit() {
    // this.customerService.getUsers().subscribe(data =>{
    //   this.customers =data;
    //   console.log(data);
    //   const returnText = data['body'].returnCode;
    //   if('0000'=== returnText){
    //     console.log("讀入全部資料");
    //     const body = data['body'];
    //     this.customers = body.dataList;
    //    }   
    //   }
    // )
    this.getAll();
    console.log("進入這頁面時發生");
  }


  getAll(){
    let userJSON = {
      'header': {
        'msgId': '1',
        'txnSeq': '2',
        'branchId': '3',
        'clientIp': '4'
      },
      'body': {
        
      }
    };

       // 透過 JSON.parse() 解析 JSON 字串
       let user = JSON.stringify(userJSON);
       var newstr = user
  
       console.log(
        "newstr"+newstr
       );
  
       var objJsonArray =JSON.parse(newstr);

     this.http.post('http://localhost:8080/customer/page',objJsonArray
     ,this.headers).subscribe(
                 res => {
                   const returnText = res['body'].returnCode;
                   if('0000'=== returnText){
                    console.log("讀入全部資料");
                    const body = res['body'];
                    this.customers = body.dataList;
                    console.log(body.page);//頁碼
                    console.log(body.size);//每頁多少筆
                    console.log(body.totalPages);//總頁數
                    this.page=body.page;
                    this.size=body.size;
                    this.totalPages=body.totalPages;
                    console.log(this.page);//頁碼
                    console.log(this.size);//每頁多少筆
                    console.log(this.totalPages);//總頁數

                    //this.customerService.addpage(body.page);
                    //this.customerService.addsize(body.size);
                    //this.customerService.addtotalPages(body.totalPages);
                   }
                 },errRes =>{
                   console.log(errRes);
                 }
               );
  }   

  changePagetoEnd(newPage: number){
    let userJSON = {
      'header': {
        'msgId': '1',
        'txnSeq': '2',
        'branchId': '3',
        'clientIp': '4'
      },
      'body': {
        "page": newPage
        
      }
    };

       // 透過 JSON.parse() 解析 JSON 字串
       let user = JSON.stringify(userJSON);
       var newstr = user
  
       console.log(
        "newstr"+newstr
       );
  
       var objJsonArray =JSON.parse(newstr);

     this.http.post('http://localhost:8080/customer/page2',objJsonArray
     ,this.headers).subscribe(
                 res => {
                   const returnText = res['body'].returnCode;
                   if('0000'=== returnText){
                    console.log("讀入全部資料");
                    const body = res['body'];
                    this.customers = body.dataList;
                    console.log(body.page);//頁碼
                    console.log(body.size);//每頁多少筆
                    console.log(body.totalPages);//總頁數
                    this.page=body.page;
                    this.size=body.size;
                    this.totalPages=body.totalPages;
                    console.log(this.page);//頁碼
                    console.log(this.size);//每頁多少筆
                    console.log(this.totalPages);//總頁數

                    //this.customerService.addpage(body.page);
                    //this.customerService.addsize(body.size);
                    //this.customerService.addtotalPages(body.totalPages);
                   }
                 },errRes =>{
                   console.log(errRes);
                 }
               );
  }

}
