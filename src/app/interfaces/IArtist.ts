import { IMusisc } from './IMusic';

export interface IArtits {
  identifyArtist: string;
  nameArtist: string;
  imageUrlArtist: string;
  musicsArtist?: IMusisc[];
}
