export const APP_NAME = "SmallTrack";

export const APP_DESCRIPTION = "The best way to track your social media."

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type Page = {
  href: string;
  label: string;
  menu: boolean;
};

export type Pages = Record<string, Page>;

export const PAGES: Pages = {
  HOME: {
    href: "/",
    label: "Home",
    menu: true,
  },
  ABOUT: {
    href: "/about",
    label: "About",
    menu: false,
  },
  PRICING: {
    href: "/pricing",
    label: "Pricing",
    menu: true,
  },
  BLOG: {
    href: "/blog",
    label: "Blog",
    menu: true,
  },
  FEATURES: {
    href: "/features",
    label: "Features",
    menu: false,
  },
};
