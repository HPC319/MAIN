import type { ITradeAdapter, TradeConfig, RouteDefinition, ComponentRegistry } from '@/types/core';
import { HeroSection } from './components/HeroSection';
import { ContactForm } from './components/ContactForm';
import { ServicesGrid } from './components/ServicesGrid';

class GenericAdapter implements ITradeAdapter {
  readonly name = 'generic';

  getConfig(): TradeConfig {
    return {
      name: this.name,
      displayName: 'Generic Service Provider',
      features: {
        multiLocation: true,
        booking: true,
        crmSync: true,
      },
      routes: this.getRoutes(),
      branding: {
        logo: '/logo.svg',
        colors: {
          primary: '#000000',
          secondary: '#000000',
        },
        fonts: {
          heading: 'Inter',
          body: 'Inter',
        },
      },
    };
  }

  getRoutes(): RouteDefinition[] {
    return [
      { path: '/', component: 'HomePage' },
      { path: '/services', component: 'ServicesPage' },
      { path: '/contact', component: 'ContactPage' },
      { path: '/about', component: 'AboutPage' },
    ];
  }

  getComponents(): ComponentRegistry {
    return {
      HeroSection: HeroSection as React.ComponentType<Record<string, unknown>>,
      ContactForm: ContactForm as React.ComponentType<Record<string, unknown>>,
      ServicesGrid: ServicesGrid as React.ComponentType<Record<string, unknown>>,
    };
  }
}

export const genericAdapter = new GenericAdapter();
export default genericAdapter;
