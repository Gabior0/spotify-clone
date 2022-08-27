import { IArtits } from './../../../interfaces/IArtist';
import { SpotifyService } from './../../../services/spotify.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-artists',
  templateUrl: './top-artists.component.html',
  styleUrls: ['./top-artists.component.scss'],
})
export class TopArtistsComponent implements OnInit {
  artists: IArtits[] = [];
  selectedMenu = 'Inicio';

  constructor(private spotifyService: SpotifyService, private router: Router) {}

  ngOnInit(): void {
    this.getTopArtists();
  }

  async getTopArtists() {
    this.artists = await this.spotifyService.searchTopArtists(5);
  }

  goToArtists(artistId: string) {
    this.selectedMenu = artistId;
    this.router.navigateByUrl(`player/list/artist/${artistId}`);
  }
}
