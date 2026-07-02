export type ResourceCategory =
  | "dev-tool"
  | "plugin"
  | "website"
  | "learning"
  | "ai"
  | "design-product";

export type ResourcePricing = "free" | "freemium" | "paid" | "open-source";

export type ResourcePlatform =
  | "web"
  | "macos"
  | "windows"
  | "linux"
  | "vscode"
  | "chrome"
  | "jetbrains"
  | "github"
  | "cli";

export type ResourceItem = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: ResourceCategory;
  tags: string[];
  url: string;
  pricing: ResourcePricing;
  platforms: ResourcePlatform[];
  rating: number;
  popularity: number;
  featured: boolean;
  recommendedReason: string;
  useCases: string[];
  alternatives: string[];
  createdAt: string;
};

export type Category = {
  id: ResourceCategory;
  name: string;
  description: string;
};

export type Topic = {
  id: string;
  title: string;
  summary: string;
  resourceIds: string[];
  tags: string[];
};

export type Ranking = {
  id: string;
  title: string;
  description: string;
  resourceIds: string[];
};

export type SearchCommand = {
  id: string;
  label: string;
  description: string;
  keywords: string[];
  action: "navigate" | "feedback" | "submit";
  target?: string;
};

export type FeedbackType =
  | "broken-link"
  | "wrong-info"
  | "not-recommended"
  | "suggest-resource"
  | "other";
