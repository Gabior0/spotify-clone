import { SpotifyService } from './../../../services/spotify.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.verifyTokenUrlCallback();
  }

  verifyTokenUrlCallback() {
    const token = this.spotifyService.getTokenUrlCallback();
    if (!!token) {
      this.spotifyService.defineAccesToken(token);
    }
  }

  openLogin() {
    window.location.href = this.spotifyService.getUrlLogin();
  }
}
