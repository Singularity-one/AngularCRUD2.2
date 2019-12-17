import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  show =false;
  constructor(){ }

  ngOnInit() {
  }

  findAll(){ //點擊秀出全部
    this.show=true;
  }


}
