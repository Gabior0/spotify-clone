import { IMusisc } from './../../interfaces/IMusic';
import { IArtits } from './../../interfaces/IArtist';
import { IPlaylist } from './../../interfaces/IPlaylist';
import { IUser } from './../../interfaces/IUser';
import { addMilliseconds, format } from 'date-fns';
import { newMusic, newPlaylist } from './factories';

export function SpotifyUserForUser(
  user: SpotifyApi.CurrentUsersProfileResponse
): IUser {
  return {
    identify: user.id,
    name: user.display_name,
    imageUrl: user.images.pop().url,
  };
}

export function SpotifyPlaylistForPlaylist(
  playlist: SpotifyApi.PlaylistObjectSimplified
): IPlaylist {
  return {
    identificationPlaylist: playlist.id,
    namePlaylist: playlist.name,
    imageUrlPlaylist: playlist.images.pop().url,
  };
}

export function SpotifySinglePlaylistForPlaylist(
  playlist: SpotifyApi.SinglePlaylistResponse
): IPlaylist {
  if (!playlist) return newPlaylist();

  return {
    identificationPlaylist: playlist.id,
    namePlaylist: playlist.name,
    imageUrlPlaylist: playlist.images.shift().url,
    musics: [],
  };
}

export function SportifyArtistForArtist(
  spotifiArtist: SpotifyApi.ArtistObjectFull
): IArtits {
  return {
    identifyArtist: spotifiArtist.id,
    nameArtist: spotifiArtist.name,
    imageUrlArtist: spotifiArtist.images.sort((a, b) => a.width - b.width).pop()
      .url,
  };
}

export function SpotifyTrackForMusic(
  spotifyTrack: SpotifyApi.TrackObjectFull
): IMusisc {
  if (!spotifyTrack) return newMusic();

  const msToMinutes = (ms: number) => {
    const date = addMilliseconds(new Date(0), ms);
    return format(date, 'mm:ss');
  };

  return {
    identifyMusic: spotifyTrack.uri,
    titleMusic: spotifyTrack.name,
    artistsMusic: spotifyTrack.artists.map((artist) => ({
      identifyAM: artist.id,
      nameAM: artist.name,
    })),
    album: {
      idAlbum: spotifyTrack.album.id,
      nameAlbum: spotifyTrack.album.name,
      imageUrlAlbum: spotifyTrack.album.images.shift().url,
    },
    time: msToMinutes(spotifyTrack.duration_ms),
  };
}
