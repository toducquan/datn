import { Status } from "../../common/enum";

export enum FaqStatus {
  Published = "Published",
  Draft = "Draft",
  Private = "Private",
}

export interface FAQ {
  id?: string;
  title?: string;
  url?: string;
  content?: string;
  illustration?: string;
  userManualState?: string;
  releaseDate?: Date;
  status?: Status;
  category?: string;
  display?: string;
  author?: string;
  faqStatus?: FaqStatus;
}

export interface FAQCategory {
  id?: string;
  status?: Status;
  title: string;
}
