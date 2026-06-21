/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  imageUrl: string;
  customizationFields: {
    label: string;
    placeholder: string;
    key: string;
    type: 'text' | 'select';
    options?: string[];
  }[];
  whatsAppTemplate: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  category: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatarUrl: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface WebsiteColors {
  primary: string; // The primary color for branding, e.g., gold #BFA75E
  primaryHover: string; // e.g., #AB934E
  accent: string; // Secondary brand color
  backgroundTone: 'light' | 'slate' | 'cream' | 'dark'; // Base UI backdrop
}

export interface WebsiteConfig {
  whatsAppNumber: string;
  logoText: string;
  logoSlogan: string;
  logoUrl?: string; // If left empty, beautiful text-emblem-based logo is shown
  colors: WebsiteColors;
  bannerHeadline: string;
  bannerSubheadline: string;
  products: Product[];
  gallery: GalleryItem[];
  testimonials: Testimonial[];
  faqs: FAQItem[];
}
