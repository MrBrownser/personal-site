export type SocialIcon = "linkedin" | "github" | "twitter";

export interface SocialLink {
  href: string;
  label: string;
  icon: SocialIcon;
}

export interface TimelineEntry {
  date: string;
  title: string;
  organization: string;
  description: string;
  type: "work" | "education";
  tags?: string[];
}

export interface SiteContent {
  meta: {
    siteUrl: string;
    pageTitle: string;
    pageDescription: string;
  };
  brand: {
    navInitials: string;
  };
  career: {
    sectionNumber: string;
  };
  hero: {
    hasAvatar: boolean;
    name: string;
    portraitAlt: string;
    avatarInitials: string;
    tagline: string;
    subtagline: string;
    primaryCta: string;
    secondaryCta: string;
  };
  about: {
    sectionNumber: string;
    cardHeadlineBefore: string;
    cardHeadlineHighlight: string;
    cardHeadlineAfter: string;
    paragraphs: [string, string];
    roleParagraph: {
      beforeRole: string;
      role: string;
      atCompany: string;
      companyName: string;
      companyUrl: string;
      after: string;
    } | null;
  };
  timeline: TimelineEntry[];
  howIWork: {
    sectionNumber: string;
    cardHeadlineBefore: string;
    cardHeadlineHighlight: string;
    cardHeadlineAfter: string;
    paragraphs: [string, string];
    quote: string;
    closingParagraphs: [string, string];
  };
  contact: {
    sectionNumber: string;
    headlineBefore: string;
    headlineHighlight: string;
    headlineAfter: string;
    blurb: string;
    cta: string;
    email: string;
    socials: SocialLink[];
  };
  footer: {
    note: string;
    copyrightName: string;
  };
}
