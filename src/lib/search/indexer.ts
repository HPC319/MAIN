/**
 * CANONSTRATA Search Indexer - Server-Side Build-Time Only
 * 
 * Constitutional server-side indexer for blog content.
 * MUST ONLY RUN AT BUILD TIME - Never in client code.
 * 
 * @module search/indexer
 * @constitutional Server-Only - Build-Time Execution
 * @server-only
 */

import * as fs from "fs";
import * as path from "path";
import { searchIndexSchema, type SearchIndex, type SearchIndexEntry } from "./schemas";

/**
 * CONSTITUTIONAL GUARD: Ensure this runs server-side only
 * Throws error if executed in browser environment
 */
if (typeof window !== "undefined") {
  throw new Error(
    "CONSTITUTIONAL VIOLATION: search/indexer.ts is SERVER-ONLY and must not be imported in client code. " +
    "This module uses Node.js 'fs' module and can only run at build time."
  );
}

/**
 * Configuration for the search indexer
 */
interface IndexerConfig {
  /**
   * Directory containing blog markdown files
   */
  contentDir: string;

  /**
   * Output path for the generated search index
   */
  outputPath: string;

  /**
   * File extensions to index
   */
  extensions: string[];

  /**
   * Whether to include full content in index
   */
  includeFullContent: boolean;

  /**
   * Maximum content length to index (characters)
   */
  maxContentLength: number;
}

/**
 * Default indexer configuration
 */
const DEFAULT_CONFIG: IndexerConfig = {
  contentDir: path.join(process.cwd(), "markdown/blog"),
  outputPath: path.join(process.cwd(), "public/search-index.json"),
  extensions: [".md", ".mdx"],
  includeFullContent: false,
  maxContentLength: 5000,
};

/**
 * Extract frontmatter from markdown content
 * Parses YAML frontmatter between --- delimiters
 * 
 * @param content - Raw markdown content
 * @returns Parsed frontmatter object and remaining content
 */
function extractFrontmatter(content: string): {
  frontmatter: Record<string, unknown>;
  bodyContent: string;
} {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: {}, bodyContent: content };
  }

  const [, frontmatterText, bodyContent] = match;

  // FIX 1: Guard against undefined frontmatterText
  if (!frontmatterText) {
    return { frontmatter: {}, bodyContent: content };
  }

  const frontmatter: Record<string, unknown> = {};

  // Simple YAML parser for common frontmatter fields
  frontmatterText.split("\n").forEach((line) => {
    const [key, ...valueParts] = line.split(":");
    if (key && valueParts.length > 0) {
      const value = valueParts.join(":").trim();
      const cleanKey = key.trim();

      // Handle arrays (tags)
      if (value.startsWith("[") && value.endsWith("]")) {
        frontmatter[cleanKey] = value
          .slice(1, -1)
          .split(",")
          .map((v) => v.trim().replace(/['"]/g, ""));
      } else {
        // Remove quotes from strings
        frontmatter[cleanKey] = value.replace(/^["']|["']$/g, "");
      }
    }
  });

  return { frontmatter, bodyContent };
}

/**
 * Tokenize content for search optimization
 * Removes markdown syntax and extracts meaningful tokens
 * 
 * @param content - Markdown content to tokenize
 * @returns Array of search tokens
 */
function tokenizeContent(content: string): string[] {
  // Remove markdown syntax
  let cleaned = content
    .replace(/^#{1,6}\s+/gm, "") // Headers
    .replace(/\*\*([^*]+)\*\*/g, "$1") // Bold
    .replace(/\*([^*]+)\*/g, "$1") // Italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Links
    .replace(/`([^`]+)`/g, "$1") // Code
    .replace(/```[\s\S]*?```/g, "") // Code blocks
    .toLowerCase();

  // Extract words (alphanumeric sequences)
  const tokens = cleaned.match(/\b\w+\b/g) || [];

  // Remove duplicates and common stop words
  const stopWords = new Set([
    "a", "an", "and", "are", "as", "at", "be", "by", "for", "from",
    "has", "he", "in", "is", "it", "its", "of", "on", "that", "the",
    "to", "was", "will", "with",
  ]);

  return Array.from(new Set(tokens.filter((token) => !stopWords.has(token))));
}

/**
 * Calculate reading time based on word count
 * Average reading speed: 200 words per minute
 * 
 * @param content - Content to calculate reading time for
 * @returns Estimated reading time in minutes
 */
function calculateReadingTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.ceil(words / 200);
}

/**
 * Process a single markdown file into a search index entry
 * 
 * @param filePath - Path to markdown file
 * @param config - Indexer configuration
 * @returns Search index entry or null if processing fails
 */
function processMarkdownFile(
  filePath: string,
  config: IndexerConfig
): SearchIndexEntry | null {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const { frontmatter, bodyContent } = extractFrontmatter(content);

    // FIX 2: Extract slug with proper type safety
    const fileName = path.basename(filePath, path.extname(filePath));
    const slugFromFrontmatter = frontmatter.slug as string | undefined;
    const slug: string = slugFromFrontmatter ?? fileName;

    // Build search index entry
    const entry: SearchIndexEntry = {
      id: slug,
      title: (frontmatter.title as string) || fileName,
      excerpt: frontmatter.excerpt as string | undefined,
      slug,
      author: frontmatter.author as string | undefined,
      publishDate: frontmatter.date as string | undefined,
      tags: frontmatter.tags as string[] | undefined,
      image: frontmatter.image as string | undefined,
      tokens: tokenizeContent(bodyContent),
      metadata: {
        wordCount: bodyContent.split(/\s+/).length,
        readingTime: calculateReadingTime(bodyContent),
      },
    };

    // Optionally include full content (truncated)
    if (config.includeFullContent) {
      entry.content = bodyContent.slice(0, config.maxContentLength);
    }

    return entry;
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
    return null;
  }
}

/**
 * Recursively find all markdown files in a directory
 * 
 * @param dir - Directory to search
 * @param extensions - File extensions to include
 * @returns Array of file paths
 */
function findMarkdownFiles(dir: string, extensions: string[]): string[] {
  const files: string[] = [];

  if (!fs.existsSync(dir)) {
    console.warn(`Directory not found: ${dir}`);
    return files;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...findMarkdownFiles(fullPath, extensions));
    } else if (extensions.some((ext) => entry.name.endsWith(ext))) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Build the complete search index from markdown files
 * 
 * @param config - Indexer configuration (optional)
 * @returns Generated search index
 */
export async function buildSearchIndex(
  config: Partial<IndexerConfig> = {}
): Promise<SearchIndex> {
  const finalConfig: IndexerConfig = { ...DEFAULT_CONFIG, ...config };

  console.log("🔍 Building search index...");
  console.log(`📁 Content directory: ${finalConfig.contentDir}`);

  // Find all markdown files
  const markdownFiles = findMarkdownFiles(
    finalConfig.contentDir,
    finalConfig.extensions
  );

  console.log(`📄 Found ${markdownFiles.length} files to index`);

  // Process each file
  const entries: SearchIndexEntry[] = markdownFiles
    .map((file) => processMarkdownFile(file, finalConfig))
    .filter((entry): entry is SearchIndexEntry => entry !== null);

  console.log(`✅ Successfully indexed ${entries.length} entries`);

  // Build index object
  const index: SearchIndex = {
    version: "1.0.0",
    generatedAt: new Date().toISOString(),
    entryCount: entries.length,
    entries,
  };

  // Validate index against schema
  const validation = searchIndexSchema.safeParse(index);
  if (!validation.success) {
    throw new Error(
      `Search index validation failed: ${validation.error.message}`
    );
  }

  return validation.data;
}

/**
 * Write search index to disk
 * 
 * @param index - Search index to write
 * @param outputPath - Output file path
 */
export async function writeSearchIndex(
  index: SearchIndex,
  outputPath: string = DEFAULT_CONFIG.outputPath
): Promise<void> {
  // Ensure output directory exists
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write index to file
  fs.writeFileSync(outputPath, JSON.stringify(index, null, 2), "utf-8");

  console.log(`💾 Search index written to: ${outputPath}`);
  console.log(`📊 Index size: ${(fs.statSync(outputPath).size / 1024).toFixed(2)} KB`);
}

/**
 * Main indexer function - Build and write search index
 * 
 * @param config - Optional indexer configuration
 */
export async function generateSearchIndex(
  config: Partial<IndexerConfig> = {}
): Promise<void> {
  const startTime = Date.now();

  try {
    const index = await buildSearchIndex(config);
    await writeSearchIndex(index, config.outputPath);

    const duration = Date.now() - startTime;
    console.log(`⚡ Indexing completed in ${duration}ms`);
  } catch (error) {
    console.error("❌ Error generating search index:", error);
    throw error;
  }
}

// ============================================================================
// CLI EXECUTION
// ============================================================================

/**
 * Run indexer if executed directly from CLI
 */
if (require.main === module) {
  generateSearchIndex()
    .then(() => {
      console.log("✨ Search index generation complete!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Fatal error:", error);
      process.exit(1);
    });
}
