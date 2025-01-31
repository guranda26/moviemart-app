export type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Record<string, string | undefined>;
};
