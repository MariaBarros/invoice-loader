import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.css']
})

export class DialogDeleteComponent implements OnInit {

  @Output() onConfirm: EventEmitter<any> = new EventEmitter<any>();

  private showModal = false;

  constructor() { }

  ngOnInit() { }

  showDialog(): void {
  	this.showModal = true;
  }

  hideDialog(): void {
  	this.showModal = false;
  }

  confirm():void {
  	this.hideDialog();
  	this.onConfirm.emit({confirm: true});
  }

}