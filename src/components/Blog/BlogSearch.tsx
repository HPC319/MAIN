"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/cn";
import type { Blog } from "@/types/blog";

/**
 * Props for the BlogSearch component
 * @interface BlogSearchProps
 */
export interface BlogSearchProps {
  /**
   * Array of blog posts to search through
   */
  blogs: Blog[];
  /**
   * Callback function triggered when search results change
   * @param results - Filtered blog posts matching the search query
   */
  onSearchResults?: (results: Blog[]) => void;
  /**
   * Placeholder text for the search input
   * @default "Search blog posts..."
   */
  placeholder?: string;
  /**
   * Additional CSS classes to apply to the search container
   */
  className?: string;
  /**
   * Debounce delay in milliseconds for search input
   * @default 300
   */
  debounceMs?: number;
  /**
   * ARIA label for the search input (accessibility)
   * @default "Search blog posts"
   */
  ariaLabel?: string;
}

/**
 * BlogSearch Component
 * 
 * A performant, accessible search component for filtering blog posts.
 * Features:
 * - Debounced search to optimize performance
 * - SSR-safe implementation
 * - Full accessibility support (ARIA labels, keyboard navigation)
 * - Memoized search results
 * - Searches across title, excerpt, and slug fields
 * 
 * @component
 * @example
 * ```tsx
 * <BlogSearch 
 *   blogs={blogPosts} 
 *   onSearchResults={(results) => console.log(results)}
 *   placeholder="Find articles..."
 * />
 * ```
 */
const BlogSearch = React.forwardRef<HTMLInputElement, BlogSearchProps>(
  (
    {
      blogs,
      onSearchResults,
      placeholder = "Search blog posts...",
      className,
      debounceMs = 300,
      ariaLabel = "Search blog posts",
    },
    ref
  ): React.ReactElement => {
    const [searchQuery, setSearchQuery] = React.useState<string>("");
    const [isMounted, setIsMounted] = React.useState<boolean>(false);
    const debounceTimerRef = React.useRef<number | null>(null);

    /**
     * SSR safety: Mark component as mounted on client-side
     */
    React.useEffect(() => {
      setIsMounted(true);
      
      return () => {
        // Cleanup debounce timer on unmount
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }
      };
    }, []);

    /**
     * Memoized search function that filters blogs based on query
     * Searches across title, excerpt, and slug fields (case-insensitive)
     */
    const filteredBlogs = React.useMemo<Blog[]>(() => {
      if (!searchQuery.trim()) {
        return blogs;
      }

      const lowerQuery = searchQuery.toLowerCase().trim();

      try {
        return blogs.filter((blog: Blog): boolean => {
          const titleMatch = blog.title?.toLowerCase().includes(lowerQuery) ?? false;
          const excerptMatch = blog.excerpt?.toLowerCase().includes(lowerQuery) ?? false;
          const slugMatch = blog.slug?.toLowerCase().includes(lowerQuery) ?? false;

          return titleMatch || excerptMatch || slugMatch;
        });
      } catch (error) {
        // Error handling: log and return original blogs
        console.error("Error filtering blogs:", error);
        return blogs;
      }
    }, [blogs, searchQuery]);

    /**
     * Effect to trigger callback when search results change
     * Only runs on client-side after mount
     */
    React.useEffect(() => {
      if (isMounted && onSearchResults) {
        try {
          onSearchResults(filteredBlogs);
        } catch (error) {
          console.error("Error in onSearchResults callback:", error);
        }
      }
    }, [filteredBlogs, onSearchResults, isMounted]);

    /**
     * Debounced input change handler
     * Optimizes performance by delaying search execution
     * 
     * @param event - React change event from input element
     */
    const handleSearchChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value;

        // Clear existing timer
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }

        // Set new debounced timer
        debounceTimerRef.current = window.setTimeout(() => {
          setSearchQuery(value);
        }, debounceMs) as unknown as number;
      },
      [debounceMs]
    );

    /**
     * Keyboard event handler for accessibility
     * Allows clearing search with Escape key
     * 
     * @param event - React keyboard event
     */
    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === "Escape") {
          const target = event.target as HTMLInputElement;
          target.value = "";
          setSearchQuery("");
          
          // Clear debounce timer
          if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
          }
        }
      },
      []
    );

    /**
     * Calculate and format results count for screen readers
     */
    const resultsCount: number = filteredBlogs.length;
    const totalCount: number = blogs.length;
    const ariaLive = searchQuery ? "polite" : "off";

    return (
      <div className={cn("relative w-full", className)}>
        <div className="relative">
          <Input
            ref={ref}
            type="search"
            placeholder={placeholder}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            aria-label={ariaLabel}
            aria-controls="blog-search-results"
            aria-describedby="blog-search-description"
            className="pr-10"
            autoComplete="off"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="h-5 w-5 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Screen reader announcements */}
        <div className="sr-only" aria-live={ariaLive} aria-atomic="true">
          {searchQuery && isMounted && (
            <span>
              Found {resultsCount} of {totalCount} blog posts
            </span>
          )}
        </div>

        {/* Hidden description for screen readers */}
        <span id="blog-search-description" className="sr-only">
          Search through blog posts by title, excerpt, or slug. Press Escape to
          clear the search.
        </span>
      </div>
    );
  }
);

BlogSearch.displayName = "BlogSearch";

export { BlogSearch };