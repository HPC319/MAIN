/**
 * CANONSTRATA Search Schemas - Law Layer
 * 
 * Constitutional validation schemas for search functionality.
 * Enforces type safety and runtime validation for search queries and results.
 * 
 * @module search/schemas
 * @constitutional Law Layer - Type Safety & Validation
 */

import { z } from "zod";

/**
 * Search Query Schema
 * Validates and sanitizes search input from users
 */
export const searchQuerySchema = z.object({
  /**
   * Search query string - sanitized and validated
   */
  query: z
    .string()
    .min(1, "Search query must not be empty")
    .max(200, "Search query too long")
    .trim()
    .transform((val) => val.toLowerCase()),

  /**
   * Optional fields to search within
   */
  fields: z
    .array(z.enum(["title", "excerpt", "content", "slug", "tags", "author"]))
    .optional()
    .default(["title", "excerpt", "slug"]),

  /**
   * Maximum number of results to return
   */
  limit: z.number().int().positive().max(100).optional().default(20),

  /**
   * Offset for pagination
   */
  offset: z.number().int().nonnegative().optional().default(0),

  /**
   * Case sensitivity flag
   */
  caseSensitive: z.boolean().optional().default(false),

  /**
   * Enable fuzzy matching
   */
  fuzzy: z.boolean().optional().default(false),
});

/**
 * Search Result Item Schema
 * Represents a single search result with metadata
 */
export const searchResultItemSchema = z.object({
  /**
   * Unique identifier for the blog post
   */
  id: z.string(),

  /**
   * Blog post title
   */
  title: z.string(),

  /**
   * Blog post excerpt/description
   */
  excerpt: z.string().optional(),

  /**
   * URL slug
   */
  slug: z.string(),

  /**
   * Author information
   */
  author: z
    .object({
      name: z.string(),
      image: z.string().optional(),
    })
    .optional(),

  /**
   * Publication date
   */
  publishDate: z.string().optional(),

  /**
   * Tags/categories
   */
  tags: z.array(z.string()).optional(),

  /**
   * Featured image
   */
  image: z.string().optional(),

  /**
   * Search relevance score (0-1)
   */
  relevanceScore: z.number().min(0).max(1).optional(),

  /**
   * Highlighted matches (for display)
   */
  highlights: z
    .object({
      title: z.array(z.string()).optional(),
      excerpt: z.array(z.string()).optional(),
      content: z.array(z.string()).optional(),
    })
    .optional(),
});

/**
 * Search Results Schema
 * Complete search response with pagination metadata
 */
export const searchResultsSchema = z.object({
  /**
   * Array of search results
   */
  results: z.array(searchResultItemSchema),

  /**
   * Total number of results found
   */
  totalCount: z.number().int().nonnegative(),

  /**
   * Search query that was executed
   */
  query: z.string(),

  /**
   * Execution time in milliseconds
   */
  executionTime: z.number().nonnegative().optional(),

  /**
   * Pagination metadata
   */
  pagination: z
    .object({
      limit: z.number().int().positive(),
      offset: z.number().int().nonnegative(),
      hasMore: z.boolean(),
    })
    .optional(),

  /**
   * Search suggestions (did you mean?)
   */
  suggestions: z.array(z.string()).optional(),
});

/**
 * Search Index Entry Schema
 * Structure for individual entries in the search index
 */
export const searchIndexEntrySchema = z.object({
  id: z.string(),
  title: z.string(),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  slug: z.string(),
  author: z.string().optional(),
  publishDate: z.string().optional(),
  tags: z.array(z.string()).optional(),
  image: z.string().optional(),
  /**
   * Tokenized content for search optimization
   */
  tokens: z.array(z.string()).optional(),
  /**
   * Metadata for search ranking
   */
  metadata: z
    .object({
      wordCount: z.number().int().nonnegative().optional(),
      readingTime: z.number().nonnegative().optional(),
    })
    .optional(),
});

/**
 * Complete Search Index Schema
 */
export const searchIndexSchema = z.object({
  /**
   * Index format version
   */
  version: z.string(),

  /**
   * Timestamp of index generation
   */
  generatedAt: z.string(),

  /**
   * Total number of indexed entries
   */
  entryCount: z.number().int().nonnegative(),

  /**
   * Array of all indexed entries
   */
  entries: z.array(searchIndexEntrySchema),
});

// ============================================================================
// EXPORTED TYPES
// ============================================================================

/**
 * TypeScript type inference from Zod schemas
 * Provides type safety throughout the application
 */

export type SearchQuery = z.infer<typeof searchQuerySchema>;
export type SearchResultItem = z.infer<typeof searchResultItemSchema>;
export type SearchResults = z.infer<typeof searchResultsSchema>;
export type SearchIndexEntry = z.infer<typeof searchIndexEntrySchema>;
export type SearchIndex = z.infer<typeof searchIndexSchema>;

// ============================================================================
// VALIDATION UTILITIES
// ============================================================================

/**
 * Validates a search query and returns parsed result
 * @param query - Raw search query object
 * @returns Validated and sanitized search query
 * @throws {z.ZodError} If validation fails
 */
export function validateSearchQuery(query: unknown) {
  return searchQuerySchema.safeParse(query);
}

/**
 * Validates search results structure
 * @param results - Raw search results object
 * @returns Validated search results
 * @throws {z.ZodError} If validation fails
 */
export function validateSearchResults(results: unknown) {
  return searchResultsSchema.safeParse(results);
}

/**
 * Validates search index structure
 * @param index - Raw search index object
 * @returns Validated search index
 * @throws {z.ZodError} If validation fails
 */
export function validateSearchIndex(index: unknown) {
  return searchIndexSchema.safeParse(index);
}

/**
 * Type guard for SearchQuery
 */
export function isSearchQuery(value: unknown): value is SearchQuery {
  return searchQuerySchema.safeParse(value).success;
}

/**
 * Type guard for SearchResults
 */
export function isSearchResults(value: unknown): value is SearchResults {
  return searchResultsSchema.safeParse(value).success;
}

/**
 * Type guard for SearchIndex
 */
export function isSearchIndex(value: unknown): value is SearchIndex {
  return searchIndexSchema.safeParse(value).success;
}
