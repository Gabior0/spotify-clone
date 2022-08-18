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
