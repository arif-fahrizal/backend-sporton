export interface CategoryType {
  name: string;
  description: string;
  image: string;
}

export interface ICategory extends CategoryType, Document {}
