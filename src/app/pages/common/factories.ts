import { IMusisc } from './../../interfaces/IMusic';
import { IArtits } from './../../interfaces/IArtist';

export function newArtist(): IArtits {
  return {
    identifyArtist: '',
    imageUrlArtist: '',
    nameArtist: '',
  };
}

export function newMusic(): IMusisc {
  return {
    identifyMusic: '',
    titleMusic: '',
    artistsMusic: [],
    album: {
      idAlbum: '',
      nameAlbum: '',
      imageUrlAlbum: '',
    },
    time: '',
  };
}
