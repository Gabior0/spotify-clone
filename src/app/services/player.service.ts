import { SpotifyService } from 'src/app/services/spotify.service';
import { IMusisc } from './../interfaces/IMusic';
import { Injectable } from '@angular/core';
import { newMusic } from '../pages/common/factories';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  currentSound = new BehaviorSubject<IMusisc>(newMusic());
  timerId: any = null;

  constructor(private spotifyService: SpotifyService) {
    this.getCurrentMusic();
  }

  async getCurrentMusic() {
    clearTimeout(this.timerId);

    //  obter musica
    const music = await this.spotifyService.getCurrentMusic();
    this.setCurrentMusic(music);

    // verificar musica
    this.timerId = setInterval(async () => {
      await this.getCurrentMusic();
    }, 3000);
  }

  setCurrentMusic(music: IMusisc) {
    this.currentSound.next(music);
  }

  async backMusic() {
    await this.spotifyService.backMusic();
  }

  async nextMusic() {
    await this.spotifyService.nextMusic();
  }
}
