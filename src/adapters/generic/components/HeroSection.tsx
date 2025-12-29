interface HeroProps {
  readonly title: string;
  readonly subtitle?: string;
  readonly ctaText?: string;
  readonly ctaHref?: string;
  readonly backgroundImage?: string;
}

export function HeroSection({
  title,
  subtitle,
  ctaText = 'Get Started',
  ctaHref = '/contact',
  backgroundImage,
}: HeroProps) {
  return (
    <section
      className="relative min-h-[600px] flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 text-white"
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">{title}</h1>
        {subtitle && <p className="text-xl md:text-2xl mb-8 text-blue-100">{subtitle}</p>}
        <a
          href={ctaHref}
          className="inline-block px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
        >
          {ctaText}
        </a>
      </div>
    </section>
  );
}
