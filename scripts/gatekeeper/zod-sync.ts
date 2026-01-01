/**
 * Zod Sync - Schema Synchronization Tool
 * Ensures Zod schemas stay in sync with TypeScript types
 */

import { Project, InterfaceDeclaration, TypeAliasDeclaration } from 'ts-morph';
import * as fs from 'fs';
import * as path from 'path';

interface SyncResult {
  synced: number;
  missing: string[];
  mismatched: string[];
}

export class ZodSynchronizer {
  private project: Project;
  private schemasPath: string;

  constructor(tsconfigPath: string = './tsconfig.json', schemasPath: string = 'src/core/schemas.ts') {
    this.project = new Project({ tsConfigFilePath: tsconfigPath });
    this.schemasPath = schemasPath;
  }

  public sync(): SyncResult {
    const result: SyncResult = {
      synced: 0,
      missing: [],
      mismatched: []
    };

    const typesFile = this.project.getSourceFile('src/core/types.ts');
    const schemasFile = this.project.getSourceFile(this.schemasPath);

    if (!typesFile || !schemasFile) {
      console.error('Required files not found');
      return result;
    }

    const interfaces = typesFile.getInterfaces();
    const typeAliases = typesFile.getTypeAliases();

    interfaces.forEach(iface => {
      if (this.hasCorrespondingSchema(iface.getName(), schemasFile)) {
        result.synced++;
      } else {
        result.missing.push(iface.getName());
      }
    });

    typeAliases.forEach(type => {
      if (this.hasCorrespondingSchema(type.getName(), schemasFile)) {
        result.synced++;
      } else {
        result.missing.push(type.getName());
      }
    });

    return result;
  }

  private hasCorrespondingSchema(typeName: string, schemasFile: any): boolean {
    const schemaName = `${typeName}Schema`;
    const text = schemasFile.getFullText();
    return text.includes(schemaName);
  }

  public printReport(result: SyncResult): void {
    console.log('\n📋 Zod Schema Sync Report\n');
    console.log(`Synced: ${result.synced}`);

    if (result.missing.length > 0) {
      console.log(`\n❌ Missing schemas for:`);
      result.missing.forEach(name => console.log(`  - ${name}`));
    }

    if (result.mismatched.length > 0) {
      console.log(`\n⚠️  Mismatched schemas:`);
      result.mismatched.forEach(name => console.log(`  - ${name}`));
    }

    if (result.missing.length === 0 && result.mismatched.length === 0) {
      console.log('\n✓ All schemas in sync');
    }
  }
}

if (require.main === module) {
  const syncer = new ZodSynchronizer();
  const result = syncer.sync();
  syncer.printReport(result);
  process.exit((result.missing.length + result.mismatched.length) > 0 ? 1 : 0);
}
