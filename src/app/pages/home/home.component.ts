import { SpotifyService } from './../../services/spotify.service';
import { IMusisc } from './../../interfaces/IMusic';
import { Component, OnInit } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  musics: IMusisc[] = [];

  // Play icon
  playIcon = faPlay;

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.getMusics();
  }

  async getMusics() {
    this.musics = await this.spotifyService.searchMusics();
  }

  getArtists(music: IMusisc) {
    return music.artistsMusic.map((artist) => artist.nameAM).join(', ');
  }

  async playMusic(music: IMusisc) {
    await this.spotifyService.playMusic(music.identifyMusic);
  }
}
