import { IArtits } from './../../interfaces/IArtist';
import { faFolder, faMusic, faPlay } from '@fortawesome/free-solid-svg-icons';
import { PlayerService } from './../../services/player.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IAlbums } from './../../interfaces/IAlbums';
import { IMusisc } from './../../interfaces/IMusic';
import { SpotifyService } from './../../services/spotify.service';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnDestroy,
} from '@angular/core';
import { IPlaylist } from 'src/app/interfaces/IPlaylist';
import { newArtist, newMusic } from '../common/factories';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  playIcon = faPlay;
  albumIcon = faFolder;
  playlistIcon = faMusic;
  playlists: IPlaylist[] = [];
  musics: IMusisc[] = [];
  currentSound: IMusisc = newMusic();
  subs: Subscription[] = [];
  albums: IAlbums[] = [];
  artist: IArtits = newArtist();
  name = '';

  @Input()
  descrition: string;

  @Input()
  selected = false;

  @Output()
  click = new EventEmitter<void>();

  constructor(
    private spotifyService: SpotifyService,
    private activedRoute: ActivatedRoute,
    private playerService: PlayerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.searchFunction();
    this.getCurrentMusic();
    this.getName();
    this.searchPlaylist();
    this.searchMusics();
    this.searchAlbuns();
    this.searchArtist();
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe);
  }

  getName() {
    const sub = this.activedRoute.paramMap.subscribe(async (params) => {
      this.name = params.get('name');
      // const id = params.get('id');
      // await this.getPageData(type, id);
    });

    // this.subs.push(sub);
  }

  async searchPlaylist() {
    const playlistResults = await this.spotifyService.searchPlaylistsForSearch(
      this.name,
      ['playlist']
    );

    this.playlists = playlistResults;
  }

  async searchMusics() {
    const trackResults = await this.spotifyService.searchMusicsForSearch(
      this.name,
      ['track']
    );

    this.musics = trackResults;
  }

  async searchAlbuns() {
    const albunsResult = await this.spotifyService.searchAlbunsForSearch(
      this.name,
      ['album']
    );

    this.albums = albunsResult;
  }

  async searchArtist() {
    const artistResult = await this.spotifyService.searchArtistForSearch(
      this.name,
      ['artist']
    );

    this.artist = artistResult;
  }

  async playMusic(music: IMusisc) {
    await this.spotifyService.playMusic(music.identifyMusic);
    this.playerService.setCurrentMusic(music);
  }

  getCurrentMusic() {
    const sub = this.playerService.currentSound.subscribe((music) => {
      this.currentSound = music;
    });

    this.subs.push(sub);
  }

  goToPlaylist(playlistId: string) {
    // this.selectedMenu = playlistId;
    this.router.navigateByUrl(`player/list/playlist/${playlistId}`);
  }

  goToArtists(artistId: string) {
    // this.selectedMenu = artistId;
    this.router.navigateByUrl(`player/list/artist/${artistId}`);
  }

  goToAlbum(albumId: string) {
    // this.selectedMenu = artistId;
    this.router.navigateByUrl(`player/list/album/${albumId}`);
  }
}
