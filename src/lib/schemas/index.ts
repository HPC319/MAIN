/**
 * @deprecated This directory is deprecated.
 * Use @/kernel/schemas/ instead.
 * 
 * MIGRATION PATH:
 * - Auth schemas: @/kernel/schemas/auth.schemas
 * - Contact schema: @/kernel/schemas/contact.schema
 * - Newsletter schema: @/kernel/schemas/newsletter.schema
 * 
 * Constitutional Architecture Compliance:
 * - Schemas belong in src/kernel/schemas/ (single source of truth)
 * - This directory will be removed in the next major version
 */

export * from './auth-schema'
export * from './contact-schema'
