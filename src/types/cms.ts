export type SectionType = 'hero' | 'services' | 'about' | 'contact';

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
  videoUrl: string;
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
  iconName: string; // We'll store the icon name as string and map it dynamically
  title: string;
  description: string;
  color: string;
}

export interface ServicesSectionContent extends BaseSection {
  type: 'services';
  title: string;
  description: string;
  videoUrl: string;
  headerBgColor?: string;
  titleColor?: string;
  descriptionColor?: string;
  services: ServiceItem[];
}

export interface ValueItem {
  iconName: string;
  title: string;
  description: string;
}

export interface AboutSectionContent extends BaseSection {
  type: 'about';
  title: string;
  introText: string[]; // Array of paragraphs
  purpose: {
    title: string;
    description: string;
  };
  mission: {
    title: string;
    description: string;
  };
  values: ValueItem[];
  videoUrl: string;
  headerBgColor?: string;
  titleColor?: string;
}

export interface ContactSectionContent extends BaseSection {
  type: 'contact';
  title: string;
  description: string;
  whatsappNumber: string;
  headerBgColor?: string;
  titleColor?: string;
  descriptionColor?: string;
  socialLinks: {
    platform: 'whatsapp' | 'linkedin' | 'instagram';
    url: string;
    label: string;
  }[];
}

export type SectionContent = 
  | HeroSectionContent 
  | ServicesSectionContent 
  | AboutSectionContent 
  | ContactSectionContent;

export interface SiteContent {
  sections: SectionContent[];
}
