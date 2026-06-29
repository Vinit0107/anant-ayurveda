// Type definitions for all data structures

export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export interface HeroData {
  subheading: string;
  heading: string;
  headingItalic: string;
  description: string;
  primaryButton: {
    text: string;
    href: string;
  };
  secondaryButton: {
    text: string;
    href: string;
  };
}

export interface AboutBadge {
  id: string;
  title: string;
  subtitle: string;
}

export interface AboutData {
  heading: string;
  paragraphs: string[];
  stats: {
    value: string;
    label: string;
  };
  badges: AboutBadge[];
  image: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  badge: string;
  badgeColor: string;
}

export interface FooterLink {
  id: string;
  label: string;
  href: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  href: string;
  icon: string;
}

export interface FooterData {
  logo: string;
  address: string;
  socialLinks: SocialLink[];
  quickLinks: FooterLink[];
  supportLinks: FooterLink[];
  newsletter: {
    heading: string;
    description: string;
  };
  copyright: string;
}

export interface NavigationData {
  logo: {
    text1: string;
    text2: string;
  };
  links: NavLink[];
}
