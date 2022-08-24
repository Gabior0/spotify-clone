import { IPlaylist } from './../../interfaces/IPlaylist';
import { IMusisc } from './../../interfaces/IMusic';
import { IArtits } from './../../interfaces/IArtist';

export function newArtist(): IArtits {
  return {
    identifyArtist: '',
    imageUrlArtist: '',
    nameArtist: '',
    musicsArtist: [],
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

export function newPlaylist(): IPlaylist {
  return {
    identificationPlaylist: '',
    namePlaylist: '',
    imageUrlPlaylist: '',
    musics: [],
  };
}
