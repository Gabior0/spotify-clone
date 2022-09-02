import { IArtits } from './../../interfaces/IArtist';
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

  artists: IArtits;
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
    else if (type == 'artist') {
      await this.getArtistData(id);
    } else if (type == 'album') {
      await this.getAlbumData(id);
    }
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
    const playlistMusics = await this.spotifyService.searchMusicsArtist(
      artistId
    );
    const artist = await this.spotifyService.getArtist(artistId);
    const artistImage = artist.images
      .sort((a, b) => a.width - b.width)
      .pop().url;

    this.setDataPage(artist.name, artistImage, playlistMusics);
    this.title = 'Musicas : ' + artist.name;
  }

  async getAlbumData(albumId: string) {
    const albumResult = await this.spotifyService.searchAlbumArtist(albumId);
    const MusicsAlbumResult = await this.spotifyService.searchMusicsAlbum(
      albumId
    );

    const albumImage = albumResult.images
      .sort((a, b) => a.width - b.width)
      .pop().url;

    for (let i = 0; i < MusicsAlbumResult.length; i++) {
      MusicsAlbumResult[i].album.nameAlbum = albumResult.name;
    }

    this.setDataPage(albumResult.name, albumImage, MusicsAlbumResult);
    this.title = 'Album : ' + albumResult.name;
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
