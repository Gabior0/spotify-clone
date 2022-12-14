import { PlayerService } from './../../../services/player.service';
import { IMusisc } from './../../../interfaces/IMusic';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { newMusic } from '../../common/factories';
import {
  faHeart,
  faPause,
  faPlay,
  faStepBackward,
  faStepForward,
} from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss'],
})
export class PlayerCardComponent implements OnInit, OnDestroy {
  music: IMusisc = newMusic();
  subs: Subscription[] = [];

  // Icones
  beforeIcon = faStepBackward;
  afterIcon = faStepForward;
  pauseIcon = faPause;
  playIcon = faPlay;
  likeIcon = faHeart;
  pausePlay: boolean;
  likeMusicObject: string[] = [];

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.getCurrentMusic();
    this.setMusicForLike();
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  getCurrentMusic() {
    const sub = this.playerService.currentSound.subscribe((music) => {
      this.music = music;
    });

    this.subs.push(sub);
  }

  backMusic() {
    this.playerService.backMusic();
  }

  pauseMusic() {
    this.playerService.PausePlayMusic();
    this.pausePlay = this.playerService.pausePlay;
  }

  nextMusic() {
    this.playerService.nextMusic();
  }

  setMusicForLike() {
    const identifyMusic = this.music.idMusic;
    this.likeMusicObject.push(this.music.idMusic);
  }

  likeMusic(musicID: string[]) {
    this.playerService.addSaveMusics(musicID);
  }
}
