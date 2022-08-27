import { IMusisc } from './../interfaces/IMusic';
import { Router } from '@angular/router';
import { IUser } from './../interfaces/IUser';
import { SpotifyConfiguration } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import Spotify from 'spotify-web-api-js';
import {
  SportifyArtistForArtist,
  SpotifyPlaylistForPlaylist,
  SpotifySinglePlaylistForPlaylist,
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

  pause = true;

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

  async searchMusicsPlaylist(playlistId: string, offset = 0, limit = 50) {
    const playlistSpotify = await this.spotifyApi.getPlaylist(playlistId);

    if (!playlistSpotify) return null;

    const playlist = SpotifySinglePlaylistForPlaylist(playlistSpotify);

    const musicsSpotify = await this.spotifyApi.getPlaylistTracks(playlistId, {
      offset,
      limit,
    });
    playlist.musics = musicsSpotify.items.map((music) =>
      SpotifyTrackForMusic(music.track as SpotifyApi.TrackObjectFull)
    );

    return playlist;
  }

  async getArtist(artistID: string) {
    const artist = this.spotifyApi.getArtist(artistID);
    return artist;
  }

  async searchMusicsArtist(playlistId: string, offset = 0, limit = 50) {
    const artistTopTracks = await this.spotifyApi.getArtistTopTracks(
      playlistId,
      'US'
    );

    if (!artistTopTracks) return null;

    const topTracksMusics = artistTopTracks.tracks.map((music) =>
      SpotifyTrackForMusic(music as SpotifyApi.TrackObjectFull)
    );
    // const topTracksMusics = artistTopTracks.tracks.map.TopTracksForTracks(artistTopTracks);
    const tracks = topTracksMusics;

    return tracks;
  }

  async searchTopArtists(limit = 10): Promise<IArtits[]> {
    const artist = await this.spotifyApi.getMyTopArtists({ limit });
    return artist.items.map(SportifyArtistForArtist);
  }

  async searchMusics(offset = 0, limit = 50): Promise<IMusisc[]> {
    const musics = await this.spotifyApi.getMySavedTracks({ offset, limit });
    return musics.items.map((x) => SpotifyTrackForMusic(x.track));
  }

  async playMusic(musicID: string) {
    await this.spotifyApi.queue(musicID);
    await this.spotifyApi.skipToNext();
  }

  async getCurrentMusic(): Promise<IMusisc> {
    const musicSpotify = await this.spotifyApi.getMyCurrentPlayingTrack();
    return SpotifyTrackForMusic(musicSpotify.item);
  }

  async backMusic() {
    await this.spotifyApi.skipToPrevious();
  }

  async PausePlayMusic() {
    if (!this.pause) {
      await this.spotifyApi.pause();
      this.pause = true;
    } else {
      await this.spotifyApi.play();
      this.pause = false;
    }
  }

  async nextMusic() {
    await this.spotifyApi.skipToNext();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
