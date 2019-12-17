import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  @Input() fTitle;//父傳子,子接值地方
  @Input() page;
  @Input() size;
  @Input() totalPages;

  @Output() addEvent = new EventEmitter();//子上父方法
  addValue(value) {
    value = Number(value);
    this.addEvent.emit(value);
  }  

  sonpage:string=this.page;
  sonsize:string=this.size;
  sontotalPages:string=this.totalPages;

 

  constructor() { }

  ngOnInit() {
    console.log("子的值"+this.page);

  }


}
