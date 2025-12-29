export interface IAdapter<TConfig = unknown> {
  readonly name: string;
  getConfig(): TConfig;
}

export interface ITradeAdapter extends IAdapter<TradeConfig> {
  getRoutes(): RouteDefinition[];
  getComponents(): ComponentRegistry;
}

export interface ICMSAdapter extends IAdapter {
  fetch<T>(query: ContentQuery): Promise<T>;
  upload(file: File): Promise<MediaAsset>;
}

export interface IAnalyticsAdapter extends IAdapter {
  track(event: string, properties?: Record<string, unknown>): void;
  identify(userId: string, traits?: Record<string, unknown>): void;
  page(name: string, properties?: Record<string, unknown>): void;
}

export interface ICRMAdapter extends IAdapter {
  createLead(data: LeadData): Promise<LeadResult>;
  updateContact(id: string, data: ContactData): Promise<ContactResult>;
  sync(payload: SyncPayload): Promise<SyncResult>;
}

export interface TradeConfig {
  readonly name: string;
  readonly displayName: string;
  readonly features: FeatureFlags;
  readonly routes: RouteDefinition[];
  readonly branding: BrandingConfig;
}

export interface RouteDefinition {
  readonly path: string;
  readonly component: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface ComponentRegistry {
  readonly [key: string]: React.ComponentType<any>;
}

export interface FeatureFlags {
  readonly multiLocation: boolean;
  readonly booking: boolean;
  readonly crmSync: boolean;
}

export interface BrandingConfig {
  readonly logo: string;
  readonly colors: ColorScheme;
  readonly fonts: FontScheme;
}

export interface ColorScheme {
  readonly primary: string;
  readonly secondary: string;
}

export interface FontScheme {
  readonly heading: string;
  readonly body: string;
}

export interface ContentQuery {
  readonly collection: string;
  readonly filter?: Readonly<Record<string, unknown>>;
  readonly limit?: number;
  readonly offset?: number;
}

export interface MediaAsset {
  readonly id: string;
  readonly url: string;
  readonly filename: string;
  readonly mimeType: string;
}

export interface LeadData {
  readonly name: string;
  readonly email: string;
  readonly phone?: string;
  readonly service?: string;
  readonly message?: string;
}

export interface LeadResult {
  readonly id: string;
  readonly status: string;
}

export interface ContactData {
  readonly [key: string]: unknown;
}

export interface ContactResult {
  readonly id: string;
  readonly updated: boolean;
}

export interface SyncPayload {
  readonly type: string;
  readonly data: Readonly<Record<string, unknown>>;
}

export interface SyncResult {
  readonly success: boolean;
  readonly syncedAt: Date;
}
