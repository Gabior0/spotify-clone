import { IMusisc } from './IMusic';

export interface IAlbums {
  identificationAlbum: string;
  nameAlbum: string;
  imageUrlAlbum: string;
  musics?: IMusisc[];
}
