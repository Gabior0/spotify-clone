import { IArtits } from './../../../interfaces/IArtist';
import { SpotifyService } from './../../../services/spotify.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-artists',
  templateUrl: './top-artists.component.html',
  styleUrls: ['./top-artists.component.scss'],
})
export class TopArtistsComponent implements OnInit {
  artists: IArtits[] = [];

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.getTopArtists();
  }

  async getTopArtists() {
    this.artists = await this.spotifyService.searchTopArtists(5);
  }
}
