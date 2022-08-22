import { Router } from '@angular/router';
import { SpotifyService } from './../../../services/spotify.service';
import { IPlaylist } from './../../../interfaces/IPlaylist';
import { Component, OnInit } from '@angular/core';
import {
  faGuitar,
  faHome,
  faMusic,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-left-board',
  templateUrl: './left-board.component.html',
  styleUrls: ['./left-board.component.scss'],
})
export class LeftBoardComponent implements OnInit {
  selectedMenu = 'Inicio';

  playlists: IPlaylist[] = [];

  // Icons
  homeIcon = faHome;
  searchIcon = faSearch;
  artistIcon = faGuitar;
  playListIcon = faMusic;

  constructor(private spotifyService: SpotifyService, private router: Router) {}

  ngOnInit(): void {
    this.searchPlaylists();
  }

  clickButton(button: string) {
    this.selectedMenu = button;
    this.router.navigateByUrl('/player/home');
  }

  async searchPlaylists() {
    this.playlists = await this.spotifyService.searchPlaylistUser();
  }
}
