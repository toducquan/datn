import { BaseModel, SearchBase } from "../common";
import { User } from "../user";

export interface Page extends BaseModel {
  title: string;
  url: string;
  author: string;
  content: string;
  user?: User;
}

export interface SearchPageModel extends SearchBase {
  title: string;
}

export interface CreatePage {
  title: string;
  url: string;
  content: string;
}

export interface UpdatePage {
  id?: string;
  title?: string;
  url?: string;
  content?: string;
  user?: User;
}
