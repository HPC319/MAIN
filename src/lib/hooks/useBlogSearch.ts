"use client";

import * as React from "react";
import type { Blog } from "@/types/blog";

/**
 * Sort options for blog search results
 */
export type SortOption = "date-desc" | "date-asc" | "title-asc" | "title-desc" | "relevance";

/**
 * Filter options for blog search
 */
export interface BlogSearchFilters {
  /**
   * Filter by date range
   */
  dateRange?: {
    start?: Date;
    end?: Date;
  };
  /**
   * Filter by specific tags or categories (if added to Blog type later)
   */
  tags?: string[];
}

/**
 * Return type for useBlogSearch hook
 */
export interface UseBlogSearchReturn {
  /**
   * Current search query string
   */
  query: string;
  /**
   * Set the search query
   */
  setQuery: (query: string) => void;
  /**
   * Filtered and sorted blog results
   */
  results: Blog[];
  /**
   * Whether search is currently processing (debouncing)
   */
  isSearching: boolean;
  /**
   * Current sort option
   */
  sortBy: SortOption;
  /**
   * Set the sort option
   */
  setSortBy: (sort: SortOption) => void;
  /**
   * Active filters
   */
  filters: BlogSearchFilters;
  /**
   * Set filters
   */
  setFilters: (filters: BlogSearchFilters) => void;
  /**
   * Clear all search, sort, and filters
   */
  reset: () => void;
  /**
   * Total number of blogs before filtering
   */
  totalCount: number;
  /**
   * Number of results after filtering
   */
  resultsCount: number;
}

/**
 * Options for the useBlogSearch hook
 */
export interface UseBlogSearchOptions {
  /**
   * Initial search query
   * @default ""
   */
  initialQuery?: string;
  /**
   * Initial sort option
   * @default "date-desc"
   */
  initialSort?: SortOption;
  /**
   * Debounce delay in milliseconds
   * @default 300
   */
  debounceMs?: number;
  /**
   * Initial filters
   */
  initialFilters?: BlogSearchFilters;
}

/**
 * Custom hook for blog search functionality
 * 
 * Provides comprehensive search, filter, and sort capabilities for blog posts
 * with performance optimizations including debouncing and memoization.
 * 
 * Features:
 * - Debounced search for performance
 * - Multiple sort options
 * - Date range filtering
 * - Memoized results
 * - SSR-safe implementation
 * 
 * @param blogs - Array of blog posts to search through
 * @param options - Configuration options for the hook
 * @returns Object containing search state and control functions
 * 
 * @example
 * ```tsx
 * const { query, setQuery, results, sortBy, setSortBy } = useBlogSearch(blogs, {
 *   initialSort: "date-desc",
 *   debounceMs: 300
 * });
 * ```
 */
export function useBlogSearch(
  blogs: Blog[],
  options: UseBlogSearchOptions = {}
): UseBlogSearchReturn {
  const {
    initialQuery = "",
    initialSort = "date-desc",
    debounceMs = 300,
    initialFilters = {},
  } = options;

  // State management
  const [query, setQueryState] = React.useState<string>(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = React.useState<string>(initialQuery);
  const [isSearching, setIsSearching] = React.useState<boolean>(false);
  const [sortBy, setSortBy] = React.useState<SortOption>(initialSort);
  const [filters, setFilters] = React.useState<BlogSearchFilters>(initialFilters);
  
  const debounceTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  /**
   * Debounced query update effect
   */
  React.useEffect(() => {
    setIsSearching(true);

    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new debounced timer
    debounceTimerRef.current = setTimeout(() => {
      setDebouncedQuery(query);
      setIsSearching(false);
    }, debounceMs);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [query, debounceMs]);

  /**
   * Custom setQuery wrapper to handle searching state
   */
  const setQuery = React.useCallback((newQuery: string): void => {
    setQueryState(newQuery);
  }, []);

  /**
   * Filter blogs based on search query
   */
  const searchFilteredBlogs = React.useMemo<Blog[]>(() => {
    if (!debouncedQuery.trim()) {
      return blogs;
    }

    const lowerQuery = debouncedQuery.toLowerCase().trim();

    try {
      return blogs.filter((blog: Blog): boolean => {
        const titleMatch = blog.title?.toLowerCase().includes(lowerQuery) ?? false;
        const excerptMatch = blog.excerpt?.toLowerCase().includes(lowerQuery) ?? false;
        const slugMatch = blog.slug?.toLowerCase().includes(lowerQuery) ?? false;

        return titleMatch || excerptMatch || slugMatch;
      });
    } catch (error) {
      console.error("Error filtering blogs:", error);
      return blogs;
    }
  }, [blogs, debouncedQuery]);

  /**
   * Apply additional filters (date range, tags, etc.)
   */
  const filteredBlogs = React.useMemo<Blog[]>(() => {
    let result = searchFilteredBlogs;

    try {
      // Date range filter
      if (filters.dateRange) {
        const { start, end } = filters.dateRange;
        
        result = result.filter((blog: Blog): boolean => {
          const blogDate = new Date(blog.date);
          
          if (start && blogDate < start) return false;
          if (end && blogDate > end) return false;
          
          return true;
        });
      }

      // Additional filters can be added here as the Blog type expands
      // Example: tag filtering
      if (filters.tags && filters.tags.length > 0) {
        // This would require tags field in Blog type
        // result = result.filter(blog => 
        //   filters.tags?.some(tag => blog.tags?.includes(tag))
        // );
      }

      return result;
    } catch (error) {
      console.error("Error applying filters:", error);
      return searchFilteredBlogs;
    }
  }, [searchFilteredBlogs, filters]);

  /**
   * Sort filtered blogs based on sort option
   */
  const sortedBlogs = React.useMemo<Blog[]>(() => {
    const sorted = [...filteredBlogs];

    try {
      switch (sortBy) {
        case "date-desc":
          return sorted.sort((a: Blog, b: Blog): number => 
            new Date(b.date).getTime() - new Date(a.date).getTime()
          );
        
        case "date-asc":
          return sorted.sort((a: Blog, b: Blog): number => 
            new Date(a.date).getTime() - new Date(b.date).getTime()
          );
        
        case "title-asc":
          return sorted.sort((a: Blog, b: Blog): number => 
            (a.title ?? "").localeCompare(b.title ?? "")
          );
        
        case "title-desc":
          return sorted.sort((a: Blog, b: Blog): number => 
            (b.title ?? "").localeCompare(a.title ?? "")
          );
        
        case "relevance":
          // For relevance, prioritize title matches over excerpt matches
          if (!debouncedQuery.trim()) return sorted;
          
          const lowerQuery = debouncedQuery.toLowerCase().trim();
          return sorted.sort((a: Blog, b: Blog): number => {
            const aTitle = a.title?.toLowerCase() ?? "";
            const bTitle = b.title?.toLowerCase() ?? "";
            
            const aTitleMatch = aTitle.includes(lowerQuery);
            const bTitleMatch = bTitle.includes(lowerQuery);
            
            if (aTitleMatch && !bTitleMatch) return -1;
            if (!aTitleMatch && bTitleMatch) return 1;
            
            // If both match or neither match, maintain original order
            return 0;
          });
        
        default:
          return sorted;
      }
    } catch (error) {
      console.error("Error sorting blogs:", error);
      return sorted;
    }
  }, [filteredBlogs, sortBy, debouncedQuery]);

  /**
   * Reset all search parameters
   */
  const reset = React.useCallback((): void => {
    setQueryState("");
    setDebouncedQuery("");
    setSortBy(initialSort);
    setFilters(initialFilters);
    setIsSearching(false);
  }, [initialSort, initialFilters]);

  return {
    query,
    setQuery,
    results: sortedBlogs,
    isSearching,
    sortBy,
    setSortBy,
    filters,
    setFilters,
    reset,
    totalCount: blogs.length,
    resultsCount: sortedBlogs.length,
  };
}