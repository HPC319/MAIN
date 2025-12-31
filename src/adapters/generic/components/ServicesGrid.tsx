interface Service {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon?: string;
}

interface ServicesGridProps extends Record<string, unknown> {
  readonly services: readonly Service[];
}

export function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service) => (
        <div
          key={service.id}
          className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          {service.icon && (
            <div className="w-12 h-12 mb-4 text-blue-600">
              <img src={service.icon} alt="" className="w-full h-full" />
            </div>
          )}
          <h3 className="text-xl font-bold mb-3">{service.title}</h3>
          <p className="text-gray-600 leading-relaxed">{service.description}</p>
        </div>
      ))}
    </div>
  );
}
