import type { ProjectId } from "../site-config";
import type { Locale } from "./config";

export type Dictionary = {
  meta: {
    title: string;
    description: string;
  };
  a11y: {
    skipLink: string;
    mainNav: string;
    openMenu: string;
    closeMenu: string;
    portraitAlt: string;
  };
  nav: {
    experience: string;
    capabilities: string;
    impact: string;
    systems: string;
    approach: string;
    contact: string;
    cta: string;
  };
  header: {
    brand: string;
    productBadge: string;
    statusBadge: string;
    github: string;
  };
  language: {
    label: string;
    switchTo: string;
  };
  loader: {
    skip: string;
    replay: string;
    title: string;
    subtitle: string;
    ready: string;
  };
  curiosities: {
    title: string;
    prefix: string;
    items: string[];
  };
  hero: {
    featuredLabel: string;
    currentRole: string;
    bootLabel: string;
    bootTag: string;
    bootSuffix: string;
    bootStatus: string;
    bootLines: string[];
    intro: string;
    name: string;
    availability: string;
    eyebrow: string;
    headline: string;
    subheadline: string;
    subheadlineSecondary: string;
    ctaSystems: string;
    ctaContact: string;
    ctaCv: string;
    ctaGithub: string;
    terminalQuick: string;
    terminalFeed: string;
    terminalCopy: string;
    terminalCopied: string;
    terminalCommand: string;
    tags: string[];
  };
  experience: {
    clientLabel: string;
    label: string;
    title: string;
    description: string;
    current: string;
    items: Array<{
      company: string;
      role: string;
      period: string;
      current: boolean;
      clients?: Array<{
        name: string;
        period: string;
        project: string;
        contributions: string[];
        stack: string[];
      }>;
      contributions: string[];
      stack: string[];
    }>;
  };
  positioning: {
    fullstackTitle: string;
    fullstackDesc: string;
    aiTitle: string;
    aiDesc: string;
  };
  capabilities: {
    label: string;
    title: string;
    description: string;
    items: Array<{
      title: string;
      description: string;
      metrics: string[];
    }>;
  };
  impact: {
    label: string;
    title: string;
    description: string;
    metrics: Array<{ value: string; label: string }>;
  };
  systems: {
    label: string;
    title: string;
    description: string;
    viewDetails: string;
    watchDemo: string;
    openProject: string;
    groups: Array<{
      key: "personal" | "client";
      title: string;
      items: Array<{
        id: ProjectId;
        title: string;
        category: string;
        ownership?: string;
        impact: string;
        description: string;
      }>;
    }>;
  };
  approach: {
    label: string;
    title: string;
    description: string;
    items: Array<{ title: string; description: string }>;
    engineeringQuote: string;
    engineeringHighlight: string;
    engineeringFooter: string;
  };
  philosophy: {
    title: string;
    quote: string;
    highlight: string;
    footer: string;
  };
  contact: {
    label: string;
    title: string;
    description: string;
    emailDesc: string;
    linkedinDesc: string;
    githubDesc: string;
    cvLabel: string;
    cvDesc: string;
  };
  footer: {
    role: string;
    builtWith: string;
    belfry: string;
  };
  devBanner: {
    label: string;
    message: string;
  };
};

export type Dictionaries = Record<Locale, Dictionary>;
