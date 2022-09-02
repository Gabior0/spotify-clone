import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-right-board',
  templateUrl: './right-board.component.html',
  styleUrls: ['./right-board.component.scss'],
})
export class RightBoardComponent implements OnInit {
  constructor(private router: Router) {}
  fildSearch = '';

  ngOnInit(): void {}
}
