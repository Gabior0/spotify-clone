import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-buttom-menu',
  templateUrl: './buttom-menu.component.html',
  styleUrls: ['./buttom-menu.component.scss'],
})
export class ButtomMenuComponent implements OnInit {
  @Input()
  descrition: string;

  @Input()
  selected = false;

  @Output()
  click = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onClick() {
    this.click.emit;
  }
}
