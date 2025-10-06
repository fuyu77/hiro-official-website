export interface Tanka {
  title: string;
  source: string;
}

export interface News {
  id: string;
  date: string;
  title: string;
  url: string;
}

export type NewsByYear = Record<string, News[]>;

export interface NewsProps {
  allNewsData: NewsByYear;
  years: string[];
}

export interface Blog {
  id: string;
  date: string;
  title: string;
}

export type BlogByYear = Record<string, Blog[]>;

export interface BlogProps {
  allPostsData: BlogByYear;
  years: string[];
}
