export interface IInnerLink {
  id: string;
  title: string;
  link: string;
}

export interface IMenuData {
  id: string;
    title: string;
    innerLinks: IInnerLink[] | [];
    link: string;
}
