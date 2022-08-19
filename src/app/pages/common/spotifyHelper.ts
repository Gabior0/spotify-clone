import { IPlaylist } from './../../interfaces/IPlaylist';
import { IUser } from './../../interfaces/IUser';

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
