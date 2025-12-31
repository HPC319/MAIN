/**
 * CANONSTRATA ESLint Rule: Enforce Search Constitutional Constraints
 * 
 * Constitutional enforcement rule for search implementation:
 * 1. Enforce Zod schema usage for search operations
 * 2. Block client-side filesystem access
 * 3. Validate search path imports
 * 4. Ensure server-only indexer usage
 * 
 * @module eslint-rules/enforce-search-constitution
 * @constitutional Constitutional Enforcement Layer
 */

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Enforce CANONSTRATA search constitutional constraints",
      category: "Constitutional Enforcement",
      recommended: true,
    },
    messages: {
      missingZodSchema: 
        "Search operations must use Zod schemas from '@/lib/search/schemas'. Import and validate with searchQuerySchema or searchResultsSchema.",
      clientFsAccess: 
        "CONSTITUTIONAL VIOLATION: Client code cannot import Node.js 'fs' or 'path' modules. Search indexing is SERVER-ONLY.",
      indexerClientImport: 
        "CONSTITUTIONAL VIOLATION: search/indexer.ts is SERVER-ONLY and cannot be imported in client components. Use 'use server' or build-time execution only.",
      invalidSearchImport: 
        "Search imports must be from '@/lib/search/schemas' (client-safe) or '@/lib/search/indexer' (server-only with guards).",
      missingServerDirective: 
        "Files importing search/indexer.ts must include 'use server' directive or be in a server-only context.",
    },
    fixable: null,
    schema: [],
  },

  create(context) {
    const filename = context.getFilename();
    const isClientComponent = filename.includes("/components/") || 
                             hasUseClientDirective(context);
    const isServerComponent = hasUseServerDirective(context);
    
    let hasSearchImport = false;
    let hasIndexerImport = false;
    let hasFsImport = false;
    let hasZodImport = false;

    return {
      // Check for 'use client' or 'use server' directives
      Program(node) {
        const firstStatement = node.body[0];
        if (firstStatement?.type === "ExpressionStatement") {
          const directive = firstStatement.expression?.value;
          if (directive === "use client" || directive === "use server") {
            // Store directive info
          }
        }
      },

      // Track imports
      ImportDeclaration(node) {
        const importSource = node.source.value;

        // Check for search-related imports
        if (importSource.includes("/lib/search/schemas")) {
          hasSearchImport = true;
          hasZodImport = true;
        }

        if (importSource.includes("/lib/search/indexer")) {
          hasIndexerImport = true;

          // CONSTITUTIONAL VIOLATION: Client component importing indexer
          if (isClientComponent) {
            context.report({
              node,
              messageId: "indexerClientImport",
            });
          }

          // Warn if no 'use server' directive
          if (!isServerComponent && !filename.includes("/api/")) {
            context.report({
              node,
              messageId: "missingServerDirective",
            });
          }
        }

        // CONSTITUTIONAL VIOLATION: Client-side fs/path imports
        if (
          (importSource === "fs" || 
           importSource === "path" || 
           importSource === "node:fs" || 
           importSource === "node:path") &&
          isClientComponent
        ) {
          hasFsImport = true;
          context.report({
            node,
            messageId: "clientFsAccess",
          });
        }

        // Validate search import paths
        if (
          importSource.includes("/search/") && 
          !importSource.includes("/search/schemas") && 
          !importSource.includes("/search/indexer")
        ) {
          context.report({
            node,
            messageId: "invalidSearchImport",
          });
        }
      },

      // Check search function calls for Zod validation
      CallExpression(node) {
        if (hasSearchImport && !hasZodImport) {
          // Check for search-related function calls
          const calleeName = getCalleeName(node);
          
          if (
            calleeName && 
            (calleeName.includes("search") || 
             calleeName.includes("filter") ||
             calleeName.includes("query"))
          ) {
            // Verify Zod schema usage in parent scope
            const ancestors = context.getAncestors();
            const hasValidation = ancestors.some(ancestor => 
              ancestor.type === "CallExpression" &&
              (getCalleeName(ancestor)?.includes("safeParse") ||
               getCalleeName(ancestor)?.includes("parse"))
            );

            if (!hasValidation) {
              context.report({
                node,
                messageId: "missingZodSchema",
              });
            }
          }
        }
      },
    };
  },
};

/**
 * Helper: Check if file has 'use client' directive
 */
function hasUseClientDirective(context) {
  const sourceCode = context.getSourceCode();
  const comments = sourceCode.getAllComments();
  const text = sourceCode.getText();
  
  return (
    text.includes('"use client"') || 
    text.includes("'use client'") ||
    comments.some(comment => 
      comment.value.includes("use client")
    )
  );
}

/**
 * Helper: Check if file has 'use server' directive
 */
function hasUseServerDirective(context) {
  const sourceCode = context.getSourceCode();
  const text = sourceCode.getText();
  
  return (
    text.includes('"use server"') || 
    text.includes("'use server'")
  );
}

/**
 * Helper: Extract callee name from CallExpression
 */
function getCalleeName(node) {
  if (node.callee.type === "Identifier") {
    return node.callee.name;
  }
  if (node.callee.type === "MemberExpression") {
    return node.callee.property?.name;
  }
  return null;
}
