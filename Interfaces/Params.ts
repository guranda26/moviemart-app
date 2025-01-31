export interface Params {
  id: number;
  locale?: string;
}

export interface CategoryParams {
  category: string;
  locale?: string;
}

export interface MovieTypeParams {
  type: string;
  locale?: string;
}

export type BlogParams = Promise<{id: string; locale: string}>
