import { Message } from "postcss";

export type Props = {
  params: { locale: string };
  searchParams: Promise<Message>;
};
