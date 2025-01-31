export type Params = Promise<{ locale: string }>;
type SearchParams = Promise<Record<string, string | undefined>>;

export type Props = {
  params: Params;
  searchParams: SearchParams;
};

export enum Locale {
  en = "EN",
  ka = "KA",
}

export type MovieTypeParams = Promise<{type: string; locale?: string;}>

export type BlogParams = Promise<{id: string; locale: string}>

export type LinkProps = {
  href: string;
  className?: string;
};

export type MovieParams = Promise<{ [key: string]: string }>;
