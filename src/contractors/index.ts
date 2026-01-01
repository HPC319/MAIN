/**
 * ISOLATION ZONE - CONTRACTOR BOUNDARY
 * 
 * This directory contains third-party integrations and external dependencies
 * that are isolated from the core system to maintain architectural purity.
 * 
 * RULES:
 * 1. Contractors can ONLY import from:
 *    - src/kernel/* (type definitions, constants)
 *    - External npm packages
 * 
 * 2. Contractors CANNOT import from:
 *    - src/lib/*
 *    - src/components/*
 *    - src/app/*
 *    - Other contractors
 * 
 * 3. All contractors must expose a strict contract interface
 * 4. Implementation details remain hidden
 * 5. No side effects outside contractor boundaries
 */

export * from './contracts';
