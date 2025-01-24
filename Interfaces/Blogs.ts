export interface BlogData {
  id: number;
  title: string;
  description: string;
  tags: [tag: string[]];
  category: string;
  date: string;
  imageSrc: string;
}
