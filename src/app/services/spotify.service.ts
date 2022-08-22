import { IMusisc } from './../interfaces/IMusic';
import { Router } from '@angular/router';
import { IUser } from './../interfaces/IUser';
import { SpotifyConfiguration } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import Spotify from 'spotify-web-api-js';
import {
  SportifyArtistForArtist,
  SpotifyPlaylistForPlaylist,
  SpotifyTrackForMusic,
  SpotifyUserForUser,
} from '../pages/common/spotifyHelper';
import { IPlaylist } from '../interfaces/IPlaylist';
import { IArtits } from '../interfaces/IArtist';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  spotifyApi: Spotify.SpotifyWebApiJs = null;
  user: IUser;

  constructor(private router: Router) {
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
      this.user.identify,
      { offset, limit }
    );
    return playlists.items.map(SpotifyPlaylistForPlaylist);
  }

  async searchTopArtists(limit = 10): Promise<IArtits[]> {
    const artitis = await this.spotifyApi.getMyTopArtists({ limit });
    return artitis.items.map(SportifyArtistForArtist);
  }

  async searchMusics(offset = 0, limit = 50): Promise<IMusisc[]> {
    const musics = await this.spotifyApi.getMySavedTracks({ offset, limit });
    return musics.items.map((x) => SpotifyTrackForMusic(x.track));
  }

  async playMusic(musicID: string) {
    await this.spotifyApi.queue(musicID);
    await this.spotifyApi.skipToNext();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
