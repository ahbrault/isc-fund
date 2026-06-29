export type CatalogPageKind = 'cover' | 'chapter' | 'lot' | 'rules';

export type CatalogPage = {
  pageIndex: number;
  image: string;
  kind: CatalogPageKind;
  lotId?: number;
};

export type Catalog = {
  pages: CatalogPage[];
};
