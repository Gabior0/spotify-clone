import { IMusisc } from './IMusic';

export interface IPlaylist {
  identificationPlaylist: string;
  namePlaylist: string;
  imageUrlPlaylist: string;
  musics?: IMusisc[];
}
