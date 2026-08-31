export type SectionType = 'hero' | 'services' | 'about' | 'contact' | 'posts' | 'news' | 'settings' | 'courses';

export interface BaseSection {
  id: string;
  type: SectionType;
  isVisible: boolean;
}

export interface HeroSectionContent extends BaseSection {
  type: 'hero';
  title: string;
  titleHighlight?: string;
  subtitle: string;
  description: string;
  badge?: string;
  imageUrl?: string;
  statsLabel?: string;
  statsValue?: string;
  floatingCardTitle?: string;
  floatingCardSubtitle?: string;
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
  imageUrl?: string;
  category?: 'companies' | 'individuals';
  includes?: string[];
  includesLabel?: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface ModalidadItem {
  iconName: string;
  title: string;
  description: string;
  featured?: boolean;
}

export interface FormacionItem {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  link?: string;
}

export interface InCompanyContent {
  title: string;
  highlight: string;
  description: string;
  imageUrl: string;
  areas: string[];
  modalitiesTitle: string;
  modalities: {
    iconName: string;
    title: string;
    description: string;
  }[];
  ctaText: string;
  ctaLink: string;
}

export interface ServicesSectionContent extends BaseSection {
  type: 'services';
  title: string;
  description: string;
  eyebrow?: string;
  modalidadesTitle?: string;
  modalidades?: ModalidadItem[];
  formacionesTitle?: string;
  formacionesDescription?: string;
  formaciones?: FormacionItem[];
  formacionesComingSoon?: {
    title: string;
    description: string;
  };
  inCompany?: InCompanyContent;
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
  eyebrow?: string;
  personName?: string;
  personRole?: string;
  personImage?: string;
  specialties?: string[];
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
  pillarsTitle?: string;
  pillars?: ValueItem[];
  backgroundType?: 'media' | 'color';
  videoUrl: string;
  backgroundColor?: string;
  headerBgColor?: string;
  titleColor?: string;
}

export interface CustomTrainingStep {
  number: string;
  title: string;
  description: string;
}

export interface ContactSectionContent extends BaseSection {
  type: 'contact';
  title: string;
  description: string;
  whatsappNumber: string;
  email?: string;
  customTraining?: {
    title: string;
    description: string;
    steps: CustomTrainingStep[];
    ctaText: string;
  };
  backgroundType?: 'media' | 'color';
  videoUrl?: string;
  backgroundColor?: string;
  headerBgColor?: string;
  titleColor?: string;
  descriptionColor?: string;
  socialLinks: {
    platform: 'whatsapp' | 'linkedin' | 'instagram' | 'email';
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
  citation?: string;
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
  newsPageTitle?: string;
  newsPageSubtitle?: string;
  newsItems: NewsItem[];
}

export interface SettingsSectionContent extends BaseSection {
  type: 'settings';
  cvUrl: string;
  cvText: string;
  footerTagline?: string;
}

export interface CourseBlockButton {
  text: string;
  link: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

export interface CourseIconGridItem {
  iconName: string;
  title: string;
  description: string;
  tone?: 'secondary' | 'primary';
}

export interface CourseInstructor {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

export interface CourseFaqItem {
  question: string;
  answer: string;
}

export type CourseBlock =
  | {
      type: 'hero';
      title: string;
      /** Substring of title rendered in italic primary */
      titleItalic?: string;
      paragraphs?: string[];
      highlight?: string;
      imageUrl?: string;
      logoUrl?: string;
      /** editorial = left-aligned Stitch hero; centered = default */
      layout?: 'editorial' | 'centered';
      checks?: string[];
      buttons?: CourseBlockButton[];
    }
  | {
      type: 'richText';
      eyebrow?: string;
      title: string;
      titleItalic?: string;
      body: string;
      paragraphs?: string[];
      background?: 'surface' | 'low' | 'container';
      align?: 'left' | 'center';
    }
  | {
      type: 'contextSplit';
      title: string;
      titleItalic?: string;
      paragraphs: string[];
      formulaLabel?: string;
      formulaItems?: { iconName: string; label: string }[];
      closing?: string;
      imageUrl: string;
    }
  | {
      type: 'beforeAfter';
      title: string;
      body?: string;
      before: { title: string; items: string[] };
      after: { title: string; items: string[] };
    }
  | {
      type: 'triad';
      title: string;
      items: { title: string; body: string; featured?: boolean }[];
    }
  | {
      type: 'desireFear';
      title: string;
      desire: { title: string; items: string[] };
      fear: { title: string; items: string[] };
    }
  | {
      type: 'pathway';
      eyebrow: string;
      intro: string[];
      forYouLabel?: string;
      forYou?: string[];
      note?: string;
      stepsTitle: string;
      stepsTitleItalic?: string;
      aside?: string;
      steps: {
        title: string;
        paragraphs: string[];
        result: string;
        imageUrl: string;
        imageFirst?: boolean;
        highlight?: boolean;
      }[];
    }
  | {
      type: 'toolsSplit';
      title: string;
      categories: { title: string; tools: string }[];
      paragraphs: string[];
      imageUrl: string;
    }
  | {
      type: 'philosophy';
      title: string;
      paragraphs: string[];
      emphasis?: string;
      paragraphsAfter?: string[];
    }
  | {
      type: 'testimonials';
      title: string;
      items: { quote: string; author: string }[];
    }
  | {
      type: 'teacherBand';
      title: string;
      lead?: string;
      name: string;
      role: string;
      experienceLabel?: string;
      experience?: string[];
      paragraphs?: string[];
      emphasis?: string;
      imageUrl: string;
    }
  | {
      type: 'investmentCard';
      title: string;
      badge?: string;
      inclusions: string[];
      priceOld?: string;
      priceNew: string;
      discountBadge?: string;
    }
  | {
      type: 'bonuses';
      title: string;
      items: {
        label: string;
        title: string;
        description: string;
        valueLabel: string;
        featured?: boolean;
      }[];
      footer: string;
    }
  | {
      type: 'closingCta';
      title: string;
      titleItalic?: string;
      primary: CourseBlockButton;
      doubtTitle?: string;
      doubtBody?: string;
      secondary?: CourseBlockButton;
    }
  | {
      type: 'twoColumn';
      left: { eyebrow?: string; title: string; body: string };
      right: { eyebrow?: string; title: string; body: string };
      background?: 'surface' | 'low' | 'container';
    }
  | {
      type: 'iconGrid';
      title: string;
      description?: string;
      items: CourseIconGridItem[];
      background?: 'surface' | 'low' | 'container';
    }
  | {
      type: 'splitMedia';
      title: string;
      body: string;
      imageUrl: string;
      imagePosition?: 'left' | 'right';
      background?: 'surface' | 'low' | 'container' | 'dark';
    }
  | {
      type: 'darkBand';
      title: string;
      body: string;
      imageUrl?: string;
    }
  | {
      type: 'tags';
      title: string;
      body?: string;
      tags: string[];
      asideTitle?: string;
      asideBody?: string;
    }
  | {
      type: 'instructors';
      title: string;
      people: CourseInstructor[];
    }
  | {
      type: 'faq';
      title: string;
      items: CourseFaqItem[];
    }
  | {
      type: 'pricing';
      title: string;
      body?: string;
      priceLabel: string;
      priceAmount: string;
      strikethrough?: string;
      badge?: string;
      items?: { title: string; description: string; valueLabel?: string }[];
      buttons?: CourseBlockButton[];
    }
  | {
      type: 'scheduleCta';
      title: string;
      body: string;
      metaTitle?: string;
      metaBody?: string;
      chips?: string[];
      buttons: CourseBlockButton[];
    };

export interface CoursePageContent {
  id: string;
  slug: string;
  title: string;
  blocks: CourseBlock[];
}

export interface CoursesSectionContent extends BaseSection {
  type: 'courses';
  courses: CoursePageContent[];
}

export type SectionContent =
  | HeroSectionContent
  | ServicesSectionContent
  | AboutSectionContent
  | ContactSectionContent
  | PostsSectionContent
  | NewsSectionContent
  | SettingsSectionContent
  | CoursesSectionContent;

export interface SiteContent {
  sections: SectionContent[];
}
