import { PlayerService } from './../../services/player.service';
import { SpotifyService } from './../../services/spotify.service';
import { IMusisc } from './../../interfaces/IMusic';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { newMusic } from '../common/factories';
import { Subscription } from 'rxjs';
import { sub } from 'date-fns';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  musics: IMusisc[] = [];
  currentSound: IMusisc = newMusic();

  subs: Subscription[] = [];

  // Play icon
  playIcon = faPlay;

  constructor(
    private spotifyService: SpotifyService,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.getMusics();
    this.getCurrentMusic();
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe);
  }

  async getMusics() {
    this.musics = await this.spotifyService.searchMusics();
  }

  getCurrentMusic() {
    const sub = this.playerService.currentSound.subscribe((music) => {
      this.currentSound = music;
    });

    this.subs.push(sub);
  }

  getArtists(music: IMusisc) {
    return music.artistsMusic.map((artist) => artist.nameAM).join(', ');
  }

  async playMusic(music: IMusisc) {
    await this.spotifyService.playMusic(music.identifyMusic);
    this.playerService.setCurrentMusic(music);
  }
}
