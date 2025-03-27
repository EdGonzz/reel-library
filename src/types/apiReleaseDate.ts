export type ReleaseDate = {
  id: number;
  results: Result[];
};

export type Result = {
  iso_3166_1: string;
  release_dates: ReleaseDateElement[];
};

export type ReleaseDateElement = {
  certification: string;
  descriptors: string[];
  iso_639_1: ISO639_1;
  note: string;
  release_date: Date;
  type: number;
};

export enum ISO639_1 {
  De = "de",
  Empty = "",
  En = "en",
  Es = "es",
  Fr = "fr",
  Pt = "pt",
  Ur = "ur",
}
