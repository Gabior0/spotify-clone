import { IArtits } from './../../../interfaces/IArtist';
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { newArtist } from '../../common/factories';

@Component({
  selector: 'app-top-artist',
  templateUrl: './top-artist.component.html',
  styleUrls: ['./top-artist.component.scss'],
})
export class TopArtistComponent implements OnInit {
  constructor(private spotifyService: SpotifyService) {}

  topArtist: IArtits = newArtist();

  ngOnInit(): void {
    this.searchArtisti();
  }

  async searchArtisti() {
    const artists = await this.spotifyService.searchTopArtists(1);
    if (!!artists) {
      this.topArtist = artists.pop();
    }
  }
}
