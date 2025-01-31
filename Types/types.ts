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