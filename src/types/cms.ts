export type SectionType = 'hero' | 'services' | 'about' | 'contact' | 'posts' | 'news';

export interface BaseSection {
  id: string;
  type: SectionType;
  isVisible: boolean;
}

export interface HeroSectionContent extends BaseSection {
  type: 'hero';
  title: string;
  subtitle: string;
  description: string;
  backgroundType?: 'media' | 'color';
  videoUrl: string;
  backgroundColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  descriptionColor?: string;
  buttons: {
    text: string;
    link: string;
    variant: 'primary' | 'secondary';
  }[];
}

export interface ServiceItem {
  iconName: string;
  title: string;
  description: string;
  color: string;
}

export interface ServicesSectionContent extends BaseSection {
  type: 'services';
  title: string;
  description: string;
  backgroundType?: 'media' | 'color';
  videoUrl: string;
  backgroundColor?: string;
  headerBgColor?: string;
  titleColor?: string;
  descriptionColor?: string;
  services: ServiceItem[];
}

export interface ValueItem {
  iconName: string;
  title: string;
  description: string;
  color?: string;
}

export interface AboutSectionContent extends BaseSection {
  type: 'about';
  title: string;
  introText: string[];
  purpose: {
    title: string;
    description: string;
  };
  mission: {
    title: string;
    description: string;
  };
  values: ValueItem[];
  backgroundType?: 'media' | 'color';
  videoUrl: string;
  backgroundColor?: string;
  headerBgColor?: string;
  titleColor?: string;
}

export interface ContactSectionContent extends BaseSection {
  type: 'contact';
  title: string;
  description: string;
  whatsappNumber: string;
  backgroundType?: 'media' | 'color';
  videoUrl?: string;
  backgroundColor?: string;
  headerBgColor?: string;
  titleColor?: string;
  descriptionColor?: string;
  socialLinks: {
    platform: 'whatsapp' | 'linkedin' | 'instagram';
    url: string;
    label: string;
  }[];
}

export interface PostItem {
  id: string;
  imageUrl: string;
  description: string;
  postUrl: string;
  platform: 'instagram' | 'linkedin';
}

export interface PostsSectionContent extends BaseSection {
  type: 'posts';
  title: string;
  subtitle: string;
  backgroundType?: 'media' | 'color';
  videoUrl: string;
  backgroundColor?: string;
  headerBgColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  posts: PostItem[];
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: 'pdf' | 'image' | 'excel' | 'link';
}

export interface NewsMedia {
  type: 'image' | 'video';
  url: string;
  isMain: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  media: NewsMedia[];
  date: string;
  author: string;
  category: string;
  attachments: Attachment[];
}

export interface NewsSectionContent extends BaseSection {
  type: 'news';
  title: string;
  subtitle: string;
  backgroundType: 'media' | 'color';
  videoUrl?: string;
  backgroundColor?: string;
  headerBgColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  descriptionColor?: string;
  underlineColor?: string;
  
  // News Page specific settings
  newsPageTitle?: string;
  newsPageSubtitle?: string;
  
  newsItems: NewsItem[];
}

export type SectionContent = 
  | HeroSectionContent 
  | ServicesSectionContent 
  | AboutSectionContent 
  | ContactSectionContent
  | PostsSectionContent
  | NewsSectionContent;

export interface SiteContent {
  sections: SectionContent[];
}
