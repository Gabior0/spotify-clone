import { PlayerService } from './../../services/player.service';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Subscription } from 'rxjs';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { IMusisc } from './../../interfaces/IMusic';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { newMusic } from '../common/factories';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-musics',
  templateUrl: './list-musics.component.html',
  styleUrls: ['./list-musics.component.scss'],
})
export class ListMusicsComponent implements OnInit, OnDestroy {
  bannerImageUrl = '';
  bannerText = '';

  musics: IMusisc[] = [];
  currentMusic: IMusisc = newMusic();
  playIcon = faPlay;

  title = '';

  subs: Subscription[] = [];

  constructor(
    private activedRoute: ActivatedRoute,
    private spotifyService: SpotifyService,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.getMusicsPlaylist();
    this.getCurrentMusic();
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  getCurrentMusic() {
    const sub = this.playerService.currentSound.subscribe((music) => {
      this.currentMusic = music;
    });

    this.subs.push(sub);
  }

  getMusicsPlaylist() {
    const sub = this.activedRoute.paramMap.subscribe(async (params) => {
      const type = params.get('type');
      const id = params.get('id');
      await this.getPageData(type, id);
    });

    this.subs.push(sub);
  }

  async getPageData(type: string, id: string) {
    if (type == 'playlist') await this.getPlaylistData(id);
    else await this.getArtistData(id);
  }

  async getPlaylistData(playlistId: string) {
    const playlistMusics = await this.spotifyService.searchMusicsPlaylist(
      playlistId
    );
    this.setDataPage(
      playlistMusics.namePlaylist,
      playlistMusics.imageUrlPlaylist,
      playlistMusics.musics
    );
    this.title = 'Musicas Playlist: ' + playlistMusics.namePlaylist;
  }

  async getArtistData(artistId: string) {
    const playlistMusics = await this.spotifyService.searchMusicsPlaylist(
      artistId
    );
    this.setDataPage(
      playlistMusics.namePlaylist,
      playlistMusics.imageUrlPlaylist,
      playlistMusics.musics
    );
  }

  setDataPage(bannerText: string, bannerImage: string, musics: IMusisc[]) {
    this.bannerImageUrl = bannerImage;
    this.bannerText = bannerText;
    this.musics = musics;
  }

  getArtists(music: IMusisc) {
    return music.artistsMusic.map((artist) => artist.nameAM).join(', ');
  }

  async playMusic(music: IMusisc) {
    await this.spotifyService.playMusic(music.identifyMusic);
    this.playerService.setCurrentMusic(music);
  }
}
