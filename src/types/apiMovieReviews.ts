export type MoviesReviews = {
  id: number;
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
};

export type Result = {
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: Date;
  id: string;
  updated_at: Date;
  url: string;
};

export type AuthorDetails = {
  name: string;
  username: string;
  avatar_path: null | string;
  rating: number | null;
};
