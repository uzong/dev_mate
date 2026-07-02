import { categories } from "@/data/categories";
import { commands } from "@/data/commands";
import { resources } from "@/data/resources";
import { topics } from "@/data/topics";
import type { ResourceCategory, ResourceItem, ResourcePricing } from "@/types/resource";

export type ResourceFilters = {
  category?: ResourceCategory | "all";
  tag?: string;
  platform?: string;
  pricing?: ResourcePricing | "all";
  featured?: boolean;
  query?: string;
  sort?: "recommended" | "newest" | "popular" | "rating";
};

export type SearchResult =
  | { type: "resource"; id: string; title: string; description: string; target: string }
  | { type: "topic"; id: string; title: string; description: string; target: string }
  | { type: "category"; id: string; title: string; description: string; target: string }
  | { type: "command"; id: string; title: string; description: string; target: string };

const normalize = (value: string) => value.toLowerCase().trim();

export const getResourceSearchText = (resource: ResourceItem) =>
  [
    resource.name,
    resource.tagline,
    resource.description,
    resource.recommendedReason,
    resource.category,
    resource.pricing,
    resource.tags.join(" "),
    resource.platforms.join(" "),
    resource.useCases.join(" "),
    resource.alternatives.join(" "),
  ].join(" ");

export const filterResources = (filters: ResourceFilters) => {
  const query = normalize(filters.query ?? "");

  const filtered = resources.filter((resource) => {
    const matchesQuery = query ? normalize(getResourceSearchText(resource)).includes(query) : true;
    const matchesCategory =
      !filters.category || filters.category === "all" ? true : resource.category === filters.category;
    const matchesTag = filters.tag ? resource.tags.includes(filters.tag) : true;
    const matchesPlatform = filters.platform ? resource.platforms.includes(filters.platform as never) : true;
    const matchesPricing =
      !filters.pricing || filters.pricing === "all" ? true : resource.pricing === filters.pricing;
    const matchesFeatured = filters.featured ? resource.featured : true;

    return matchesQuery && matchesCategory && matchesTag && matchesPlatform && matchesPricing && matchesFeatured;
  });

  const sort = filters.sort ?? "recommended";
  return filtered.sort((a, b) => {
    if (sort === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (sort === "popular") {
      return b.popularity - a.popularity;
    }
    if (sort === "rating") {
      return b.rating - a.rating;
    }
    return b.popularity + b.rating * 10 - (a.popularity + a.rating * 10);
  });
};

export const globalSearch = (query: string): SearchResult[] => {
  const q = normalize(query);
  if (!q) return [];

  const resourceResults = resources
    .filter((resource) => normalize(getResourceSearchText(resource)).includes(q))
    .slice(0, 8)
    .map<SearchResult>((resource) => ({
      type: "resource",
      id: resource.id,
      title: resource.name,
      description: resource.recommendedReason,
      target: `/resources/${resource.id}`,
    }));

  const topicResults = topics
    .filter((topic) => normalize(`${topic.title} ${topic.summary} ${topic.tags.join(" ")}`).includes(q))
    .slice(0, 4)
    .map<SearchResult>((topic) => ({
      type: "topic",
      id: topic.id,
      title: topic.title,
      description: topic.summary,
      target: `/topics/${topic.id}`,
    }));

  const categoryResults = categories
    .filter((category) => normalize(`${category.name} ${category.description}`).includes(q))
    .map<SearchResult>((category) => ({
      type: "category",
      id: category.id,
      title: category.name,
      description: category.description,
      target: `/resources?category=${category.id}`,
    }));

  const commandResults = commands
    .filter((command) => normalize(`${command.label} ${command.description} ${command.keywords.join(" ")}`).includes(q))
    .map<SearchResult>((command) => ({
      type: "command",
      id: command.id,
      title: command.label,
      description: command.description,
      target: command.target ?? "/",
    }));

  return [...commandResults, ...resourceResults, ...topicResults, ...categoryResults].slice(0, 14);
};

export const getAllTags = () =>
  Array.from(new Set(resources.flatMap((resource) => resource.tags))).sort((a, b) => a.localeCompare(b, "zh-CN"));

export const findResource = (id?: string) => resources.find((resource) => resource.id === id);

export const getResourcesByIds = (ids: string[]) =>
  ids.map((id) => findResource(id)).filter((resource): resource is ResourceItem => Boolean(resource));
