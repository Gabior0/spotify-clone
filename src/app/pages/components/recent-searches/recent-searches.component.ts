import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recent-searches',
  templateUrl: './recent-searches.component.html',
  styleUrls: ['./recent-searches.component.scss'],
})
export class RecentSearchesComponent implements OnInit {
  recentResearch = [
    'Top Brasil',
    'Top Global',
    'Esquenta Sertanejo',
    'Treino Pesado',
  ];

  fildSearch = '';

  constructor() {}

  ngOnInit(): void {}

  setSearch(search: string) {
    this.fildSearch = search;
  }

  seach() {
    console.log('Buscando', this.fildSearch);
  }
}
