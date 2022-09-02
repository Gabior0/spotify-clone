import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recent-searches',
  templateUrl: './recent-searches.component.html',
  styleUrls: ['./recent-searches.component.scss'],
})
export class RecentSearchesComponent implements OnInit {
  // selectedMenu = 'inicio';

  recentResearch = [
    'Top Brasil',
    'Top Global',
    'Esquenta Sertanejo',
    'Treino Pesado',
  ];

  fildSearch = '';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  setSearch(search: string) {
    this.fildSearch = search;
  }

  goToSearch(nameSearch: string) {
    this.router.navigateByUrl(`player/search/${nameSearch}`);
  }
}
