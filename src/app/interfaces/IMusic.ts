export interface IMusisc {
  identifyMusic: string;
  titleMusic: string;
  artistsMusic: {
    identifyAM: string;
    nameAM: string;
  }[];
  album?: {
    idAlbum: string;
    nameAlbum: string;
    imageUrlAlbum: string;
  };
  time: string;
  idMusic?: string;
}
