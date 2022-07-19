export interface TopPageModel {
  id?: string;
  pcBanner: string;
  mobileBanner: string;
  pcBannerPath: string;
  mobileBannerPath: string;
  name: string;
  url: string;
  order: number;
  isNew?: boolean;
}

export interface GroupPurchaseCampaignModel {
  id?: string;
  image: string;
  name: string;
  url: string;
  order: number;
  imageName: string;
  isNew?: boolean;
}

export interface SideBannerModel {
  id?: string;
  image: string;
  name: string;
  url: string;
  imageName: string;
  order: number;
  isNew?: boolean;
}

export interface MainContentBannerModel {
  id?: string;
  image: string;
  name: string;
  url: string;
  imageName: string;
  order: number;
  isNew?: boolean;
}
