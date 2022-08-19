import { IUser } from './../interfaces/IUser';
import { SpotifyConfiguration } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import Spotify from 'spotify-web-api-js';
import {
  SpotifyPlaylistForPlaylist,
  SpotifyUserForUser,
} from '../pages/common/spotifyHelper';
import { IPlaylist } from '../interfaces/IPlaylist';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  spotifyApi: Spotify.SpotifyWebApiJs = null;
  user: IUser;

  constructor() {
    this.spotifyApi = new Spotify();
  }

  async startUser() {
    if (!!this.user) return true;

    const token = localStorage.getItem('token');

    if (!token) false;

    try {
      this.defineAccesToken(token);
      await this.getSpotifyUser();
      return !!this.user;
    } catch (ex) {
      return false;
    }
  }

  async getSpotifyUser() {
    const userInfo = await this.spotifyApi.getMe();
    this.user = SpotifyUserForUser(userInfo);
    console.log(this.user.identify);
  }

  getUrlLogin() {
    const authEndpoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndpoint + clientId + redirectUrl + scopes + responseType;
  }

  getTokenUrlCallback() {
    if (!window.location.hash) return '';

    const params = window.location.hash.substring(1).split('&');
    return params[0].split('=')[1];
  }

  defineAccesToken(token: string) {
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token', token);
  }

  async searchPlaylistUser(offset = 0, limit = 50): Promise<IPlaylist[]> {
    const playlists = await this.spotifyApi.getUserPlaylists(
      // this.user.identify,
      '12148053701',
      { offset, limit }
    );
    console.log(playlists);
    return playlists.items.map(SpotifyPlaylistForPlaylist);
  }
}
